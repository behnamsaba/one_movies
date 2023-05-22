import Users_Media from '@/utils/models/users_media';

export default async function removeWatchListHandler(req, res) {
    const { username, apiId } = req.query;
    await Users_Media.remove(username, apiId);
    res.status(200).json({ deleted: apiId });
}
