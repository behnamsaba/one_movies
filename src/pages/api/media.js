import Media from '@/utils/models/media';
import { validate } from 'jsonschema';
import mediaCreate from '@/utils/backend-validation/schemas/mediaCreate.json';
import { BadRequestError } from '@/utils/NextErrors';
import { createToken } from '@/utils/helpers/tokens';
export default async function handler(req, res) {
    try {
        const validator = validate(req.body, mediaCreate);
        if (!validator.valid) {
            const errs = validator.errors.map((e) => e.stack);
            throw new BadRequestError(errs);
        }
        const newMedia = await Media.create({...req.body});
        console.log("newMedia", newMedia)
        return res.json(newMedia);
    } catch (err) {
        res.status(err.status || 500).send('Server error: ' + err.message);
    }
}
