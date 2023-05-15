import User from '@/utils/models/user';
export default async function handler(req, res) {
    try {
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Server error' });
    }
}
