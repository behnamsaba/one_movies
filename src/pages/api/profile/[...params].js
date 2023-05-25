import handleGetRequest from '@/handlers/users/getUser';
import handlePatchRequest from '@/handlers/users/updateUser';
import removeWatchListHandler from '@/handlers/users/removeWatchHandler';
import addWatchListHandler from '@/handlers/users/addWatchListHandler';
import { UserError } from '../../../utils/NextErrors';

export default async function handler(req, res) {
    const { method } = req;
    try {
        if(req.query.params[0] !== req.headers.user){
            throw new UserError()
        }
        switch (method) {
            case 'GET':
                await handleGetRequest(req, res);
                break;
            case 'PATCH':
                await handlePatchRequest(req, res);
                break;
            case 'DELETE':
                await removeWatchListHandler(req, res);
                break;
            case 'POST':
                await addWatchListHandler(req, res);
                break;
                default:
                    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE', 'POST']);
                    res.status(405).json({ error: `Method ${method} Not Allowed` });
        }
    } catch (err) {
        res.status(err.status || 500).json({ err: err.message });
    }
}