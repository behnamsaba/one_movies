import Users_Media from '@/utils/models/users_media';
export default async function handler(req, res) {
    try {
        const newList = await Users_Media.createMediaWatch({ ...req.body });
        if (newList.error) {
            res.status(400).json({ error: newList.error });
        } else {
            res.status(200).json(newList);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Server error' });
    }
}
