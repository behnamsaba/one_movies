import User from '@/utils/models/user';
import { validate } from 'jsonschema';
import userAuth from '@/utils/backend-validation/schemas/userAuth.json';
import { BadRequestError } from '@/utils/NextErrors';
import { createToken } from '@/utils/helpers/tokens';
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ err: 'Method not allowed' });
    }
    
    try {
        const validator = validate(req.body, userAuth);
        if (!validator.valid) {
            const errs = validator.errors.map((e) => e.stack);
            throw new BadRequestError(errs);
        }
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = await createToken(user);
        return res.json({ token });
    } catch (err) {
        res.status(err.status || 500).json({ err: err.message });
    }
}
