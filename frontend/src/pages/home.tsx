import { Anchor, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { Layout } from "../components/layout";

export function HomePage() {
    return (
        <Layout title="Welcome">
            <Group position="apart">
                <Anchor component={Link} to="/report">
                    Report
                </Anchor>
                <Anchor component={Link} to="/user/create">
                    Create User
                </Anchor>
            </Group>
        </Layout>
    );
}
