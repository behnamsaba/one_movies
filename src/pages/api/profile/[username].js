import handleGetRequest from '@/handlers/users/getUser';
import handlePatchRequest from '@/handlers/users/updateUser';
import handleDeleteRequest from '@/handlers/users/deleteUser';
export default async function handler(req, res) {
    const { method } = req;
    try {
        switch (method) {
            case 'GET':
                await handleGetRequest(req, res);
                break;
            case 'PATCH':
                await handlePatchRequest(req, res);
                break;
            case 'DELETE':
                await handleDeleteRequest(req, res);
                break;
            default:
                res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
                res.status(405).json({ error: `Method ${method} Not Allowed`})
        }
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}
