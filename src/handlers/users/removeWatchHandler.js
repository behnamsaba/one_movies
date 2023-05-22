import Users_Media from '@/utils/models/users_media';

export default async function removeWatchListHandler(req, res) {
    const { username, apiId } = req.query;
    console.log("inside backend", username)
    console.log("inside backend", apiId)
    const deletedItem = await Users_Media.remove(username, apiId);
    console.log(deletedItem)
    res.status(200).json({ deleted: deletedItem.api_id });
}
