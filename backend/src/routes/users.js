const express = require('express')
const { catchErrors } = require('./errors');
const { getUserIdFromEmail, assertValidUserId, authed, getUser, watchUser, updateProfile } = require('./service');
const router = express.Router()

router.get('/', catchErrors(authed(async (req, res, authUserId) => {
    const { userId } = req.query;
    await assertValidUserId(userId);
    return res.json(await getUser(userId));
})));

router.put('/watch', catchErrors(authed(async (req, res, authUserId) => {
    const { email, id, turnon } = req.body;
    let userId = id;
    if (id === undefined) {
        userId = getUserIdFromEmail(email);
    }
    await assertValidUserId(userId);
    await watchUser(authUserId, userId, turnon);
    return res.status(200).send({});
})));

router.put('/', catchErrors(authed(async (req, res, authUserId) => {
    const { email, password, name, image } = req.body;
    await updateProfile(authUserId, email, password, name, image);
    return res.status(200).send({});
})));

module.exports = router
