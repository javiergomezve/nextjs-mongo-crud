import Error from 'next/error';
import { useState } from 'react';
import { Grid, Button, Confirm, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const TaskDetail = ({ task, error }) => {
    const { query, push } = useRouter();

    const [confirm, setConfirm] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const open = () => {
        setConfirm(true);
    };

    const close = () => {
        setConfirm(false);
    };

    const deleteTask = async () => {
        const { id } = query;

        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = () => {
        setIsDeleting(true);
        deleteTask();
        close();
        setIsDeleting(false);
        push('/');
    };

    if (error && error.statusCode)
        return <Error statusCode={error.statusCode} title={error.statusText} />;

    return (
        <Grid
            centered
            verticalAlign="middle"
            columns="1"
            style={{ height: '80vh' }}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <div>
                        <Button color="red" onClick={open} loading={isDeleting}>
                            Delete
                        </Button>
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Confirm
                header="Please confirm"
                content="Are you sure you want to delete this task?"
                open={confirm}
                onConfirm={handleDelete}
                onCancel={close}
            />
        </Grid>
    );
};

export default TaskDetail;

export async function getServerSideProps({ query: { id } }) {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`);

    if (response.status === 200) {
        const task = await response.json();

        return {
            props: {
                task,
            },
        };
    }

    return {
        props: {
            error: {
                statusCode: response.status,
                statusText: 'Invalid id',
            },
        },
    };
}
