// Handle POST request to add a media item to the user's watchlist path. PATH: 'api/profile/:pathname'
import Users_Media from '@/utils/models/users_media';
import { validate } from 'jsonschema';
import mediaCreate from '@/utils/backend-validation/schemas/mediaCreate.json';
import { BadRequestError } from '@/utils/NextErrors';

export default async function addWatchListHandler(req, res) {
    try {
        const validator = validate(req.body, mediaCreate);
        if (!validator.valid) {
            const errs = validator.errors.map((e) => e.stack);
            throw new BadRequestError(errs);
        }
        const { username } = req.query;
        const newList = await Users_Media.createMediaWatch({
            username,
            ...req.body,
        });
        res.status(200).json(newList);
    } catch (err) {
        res.status(err.status || 500).json({ err: err.message });
    }
}
