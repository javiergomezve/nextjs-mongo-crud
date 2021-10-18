import { useState, useEffect } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewTask = () => {
    const { query, push } = useRouter();

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const error = {};

        if (!newTask.title) error.title = 'Title is required';
        if (!newTask.description) error.description = 'Description is required';

        return error;
    };

    const createTask = async () => {
        try {
            await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async () => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        let error = validate();

        if (Object.keys(error).length) return setErrors(error);

        if (query.id) {
            await updateTask();
        } else {
            await createTask();
        }

        push('/');
    };

    const handleChange = e => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    const getTask = async () => {
        const response = await fetch(
            `http://localhost:3000/api/tasks/${query.id}`
        );
        const data = await response.json();
        setNewTask({ title: data.title, description: data.description });
    };

    useEffect(() => {
        if (query.id) {
            getTask();
        }
    }, []);

    return (
        <Grid
            centered
            verticalAlign="middle"
            columns="3"
            style={{ height: '80vh' }}
        >
            <Grid.Row>
                <Grid.Column>
                    <h1>{query.id ? 'Update task' : 'Create task'}</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            label="Title"
                            placeholder="Title"
                            name="title"
                            value={newTask.title}
                            onChange={handleChange}
                            error={
                                errors.title
                                    ? {
                                          content: errors.title,
                                          pointing: 'below',
                                      }
                                    : null
                            }
                        />

                        <Form.TextArea
                            label="Description"
                            placeholder="Description"
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            error={
                                errors.description
                                    ? {
                                          content: errors.description,
                                          pointing: 'below',
                                      }
                                    : null
                            }
                        />

                        <Button primary>Save</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default NewTask;
