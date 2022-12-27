import {
    Anchor,
    Box,
    Center,
    Loader,
    Pagination,
    Table,
    Text,
    TextInput,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { api, User } from "../api";
import { Layout } from "../components/layout";

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        header: () => <span>First name</span>,
    }),
    columnHelper.accessor("lastName", {
        cell: (info) => info.getValue(),
        header: () => <span>Last name</span>,
    }),
    columnHelper.accessor("address", {
        cell: (info) => info.getValue(),
        header: () => <span>Address</span>,
    }),
    columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
    }),
];

export function ReportPage() {
    return (
        <Layout
            title="Report"
            header={
                <Anchor component={Link} to="/">
                    Back
                </Anchor>
            }
        >
            <Report />
        </Layout>
    );
}

function Report() {
    const [search, setSearch] = useDebouncedState("", 200);
    const [page, setPage] = useState(1);
    const usersQuery = useQuery(["users", page, search], () =>
        api.getUsers({ page, search })
    );
    const users = usersQuery.data?.data.users ?? [];
    const pages = usersQuery.data?.data.pages ?? 0;

    useEffect(() => {
        if (search) setPage(1);
    }, [search]);

    return (
        <div>
            <TextInput
                label="Search"
                defaultValue={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                mb="xl"
                sx={{ maxWidth: 300 }}
                placeholder="e.g. erfan"
            />
            <Box sx={{ overflowX: "auto", minHeight: 405 }}>
                <ReportTable users={users} loading={usersQuery.isLoading} />
            </Box>
            <Pagination
                total={pages}
                mt="xl"
                page={page}
                onChange={setPage}
                position="right"
                withEdges
            />
        </div>
    );
}

function ReportTable({ users, loading }: { users: User[]; loading: boolean }) {
    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) {
        return (
            <Center>
                <Loader size="xs" />
            </Center>
        );
    }

    if (users.length === 0) {
        return (
            <Text size="xs" color="dimmed">
                No users found
            </Text>
        );
    }

    return (
        <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
