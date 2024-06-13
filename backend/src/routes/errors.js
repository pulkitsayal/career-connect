const { save, InputError, AccessError } = require('./service');

const catchErrors = fn => async (req, res) => {
    try {
        await fn(req, res);
        save();
    } catch (err) {
        if (err instanceof InputError) {
            res.status(400).send({ error: err.message });
        } else if (err instanceof AccessError) {
            res.status(403).send({ error: err.message });
        } else {
            console.log(err);
            res.status(500).send({ error: 'A system error ocurred' });
        }
    }
};

module.exports = { catchErrors };
