const express = require('express');
const { catchErrors } = require('./errors');
const { authed, assertValidJobPost, assertCreatorOfJobPost, assertWatcherOfJobPost, getJobs, 
    postJob, updateJobPost, commentOnJobPost, likeJobPost, deleteJobPost } = require('./service');
const router = express.Router();

router.get('/feed', catchErrors(authed(async (req, res, authUserId) => {
    const { start } = req.query;
    return res.json(await getJobs(authUserId, parseInt(start, 10)));
})));
  
router.post('/', catchErrors(authed(async (req, res, authUserId) => {
    const { image, title, start, description } = req.body;
    return res.json({
        id: await postJob(authUserId, image, title, start, description)
    });
})));
  
router.put('/', catchErrors(authed(async (req, res, authUserId) => {
    const { id, image, title, start, description } = req.body;
    await assertValidJobPost(id);
    await assertCreatorOfJobPost(authUserId, id);
    await updateJobPost(authUserId, id, image, title, start, description);
    return res.status(200).send("Success: updated job");
})));
  
router.delete('/', catchErrors(authed(async (req, res, authUserId) => {
    const { id } = req.body;
    await assertValidJobPost(id);
    await assertCreatorOfJobPost(authUserId, id);
    await deleteJobPost(authUserId, id);
    return res.status(200).send("Success: deleted job");
})));
  
router.post('/comment', catchErrors(authed(async (req, res, authUserId) => {
    const { id, comment } = req.body;
    await assertValidJobPost(id);
    await assertWatcherOfJobPost(authUserId, id);
    await commentOnJobPost(authUserId, id, comment);
    return res.status(200).send("Success: posted comment on job");
})));
  
router.put('/like', catchErrors(authed(async (req, res, authUserId) => {
    const { id, turnon } = req.body;
    await assertValidJobPost(id);
    await assertWatcherOfJobPost(authUserId, id);
    await likeJobPost(authUserId, id, turnon);
    return res.status(200).send({});
})));

module.exports = router;

