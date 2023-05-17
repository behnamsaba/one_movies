// handlers/users/updateUser.js
import User from '@/utils/models/user';
import { validate } from 'jsonschema';
import userUpdate from '@/utils/backend-validation/schemas/userUpdate.json';
import { BadRequestError } from '@/utils/NextErrors';

export default async function updateUser(req, res) {
    const { username } = req.query;
    const validator = validate(req.body, userUpdate);
    if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
    }
    const user = await User.update(username, req.body);
    return res.json(user);
}
