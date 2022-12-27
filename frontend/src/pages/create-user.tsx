import { Anchor, Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { z } from "zod";
import { api } from "../api";
import { Layout } from "../components/layout";

export function CreateUserPage() {
    return (
        <Layout
            title="Create User"
            header={
                <Anchor component={Link} to="/">
                    Back
                </Anchor>
            }
        >
            <UserForm />
        </Layout>
    );
}

const schema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    address: z.string().min(1).max(200),
    email: z.string().email().min(1).max(100),
});

type Schema = z.infer<typeof schema>;

function UserForm() {
    const form = useForm<Schema>({
        validate: zodResolver(schema),
        initialValues: { firstName: "", lastName: "", address: "", email: "" },
    });
    const createUserMutation = useMutation(api.createUser, {
        onSuccess: () =>
            showNotification({
                title: "Success",
                message: "User created successfully",
                color: "green",
            }),
    });

    const onSubmit = form.onSubmit((values) =>
        createUserMutation.mutate(values)
    );

    return (
        <form onSubmit={onSubmit}>
            <Stack spacing="xl">
                <TextInput
                    label="First name"
                    name="firstName"
                    placeholder="e.g. Erfan"
                    {...form.getInputProps("firstName")}
                />
                <TextInput
                    label="Last name"
                    name="lastName"
                    placeholder="e.g Qasemizade"
                    {...form.getInputProps("lastName")}
                />
                <TextInput
                    label="Address"
                    name="address"
                    placeholder="e.g. Yazd, Safaiee, ..."
                    {...form.getInputProps("address")}
                />
                <TextInput
                    label="Email"
                    name="email"
                    placeholder="example@email.com"
                    {...form.getInputProps("email")}
                />
                <Button type="submit" loading={createUserMutation.isLoading}>
                    Create
                </Button>
            </Stack>
        </form>
    );
}
