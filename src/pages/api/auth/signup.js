import User from '@/utils/models/user';
import { validate } from 'jsonschema';
import userRegisterSchema from '../../../utils/backend-validation/schemas/userRegister.json'
import { createToken } from '../../../utils/helpers/tokens';
import { BadRequestError } from '../../../utils/NextErrors';
export default async function handler(req, res) {
    try {
        const validator = validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map((e) => e.stack);
            throw new BadRequestError(errs);
        }
        const newUser = await User.register({...req.body});
        const token = await createToken(newUser);
        return res.json({ token });
    } catch (err) {
        res.status(err.status || 500).json({ err: err.message });
    }
}
