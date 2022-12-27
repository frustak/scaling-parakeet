import { Container, Divider, Group, Title } from "@mantine/core";
import { ReactNode } from "react";

export function Layout({
    children,
    title,
    header,
}: {
    children: ReactNode;
    title: string;
    header?: ReactNode;
}) {
    return (
        <Container mt="xl">
            <Group position="apart" align="center">
                <Title>{title}</Title>
                <div>{header}</div>
            </Group>
            <Divider my="xl" />
            <div>{children}</div>
        </Container>
    );
}
