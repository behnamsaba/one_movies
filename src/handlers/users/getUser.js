// handlers/users/getUser.js
import User from '@/utils/models/user';

export default async function getUser(req, res) {
    const username = req.query.params[0]
    const user = await User.get(username);
    res.status(200).json(user);
}


