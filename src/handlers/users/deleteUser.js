// handlers/users/getUser.js
import User from '@/utils/models/user';

export default async function deleteUser(req, res) {
    const { username } = req.query;
    await User.remove(username);
    console.log("this is delete")
    res.status(200).json({ deleted: username });
}
