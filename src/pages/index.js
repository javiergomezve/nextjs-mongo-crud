import { useRouter } from 'next/router';
import { Button, Card, Container, Grid } from 'semantic-ui-react';

const Index = ({ tasks }) => {
    const router = useRouter();

    if (tasks.length === 0)
        return (
            <Grid
                centered
                verticalAlign="middle"
                columns="1"
                style={{ height: '80vh' }}
            >
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <h1>There is no tasks yet</h1>
                        <img
                            src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg"
                            alt="There is no tasks yet"
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );

    return (
        <Container style={{ padding: '20px' }}>
            <Card.Group itemsPerRow={4}>
                {tasks.map(task => (
                    <Card key={task._id}>
                        <Card.Content>
                            <Card.Header>{task.title}</Card.Header>
                            <p>{task.description}</p>
                        </Card.Content>

                        <Card.Content extra>
                            <Button
                                primary
                                onClick={() =>
                                    router.push(`/tasks/${task._id}`)
                                }
                            >
                                View
                            </Button>
                            <Button
                                secondary
                                onClick={() =>
                                    router.push(`/tasks/${task._id}/edit`)
                                }
                            >
                                Edit
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Container>
    );
};

export default Index;

export const getServerSideProps = async ctx => {
    const response = await fetch('http://localhost:3000/api/tasks');
    const tasks = await response.json();

    return {
        props: {
            tasks,
        },
    };
};
