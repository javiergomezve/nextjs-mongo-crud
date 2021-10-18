import { Menu, Container, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();

    return (
        <Menu inverted borderless attached>
            <Container>
                <Menu.Item>
                    <Link href="/">
                        <img src="/favicon.ico" alt="logo" />
                    </Link>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button
                            primary
                            size="mini"
                            onClick={() => router.push('/tasks/new')}
                        >
                            New task
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
};

export default Navbar;
