import Users_Media from '@/utils/models/users_media';

export default async function removeWatchListHandler(req, res) {
    const apiId = await req.query.params[1]
    const username = req.query.params[0]
    const deletedItem = await Users_Media.remove(username, apiId);
    res.status(200).json({ deleted: deletedItem.api_id });
}
