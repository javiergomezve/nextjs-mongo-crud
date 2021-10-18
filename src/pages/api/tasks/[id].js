import { dbConnect } from 'utils/mongoose';
import Task from 'models/Task';

dbConnect();

export default async function handler(req, res) {
    const {
        query: { id },
        body,
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const task = await Task.findById(id);

                if (!task)
                    return res.status(404).json({ error: 'Task not found' });

                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        case 'PUT':
            try {
                const taskUpdated = await Task.findByIdAndUpdate(id, body, {
                    new: true,
                });

                if (!taskUpdated)
                    return res.status(404).json({ error: 'Task not found' });

                return res.status(200).json(taskUpdated);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        case 'DELETE':
            try {
                const taskDeleted = await Task.findByIdAndDelete(id);

                if (!taskDeleted)
                    return res.status(404).json({ error: 'Task not found' });

                return res.status(204).json();
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        default:
            return res
                .status(400)
                .json({ message: 'This method is not supported' });
    }

    return res.status(200).json('received');
}
