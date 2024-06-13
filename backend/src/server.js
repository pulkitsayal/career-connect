const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const app = express();

app.use(express.urlencoded({ extended: true, }));
app.use(express.json({ limit: '50mb', }));

app.get('/', (req, res) => res.redirect('/docs'));

const userRouter = require('./routes/users');
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', userRouter);
app.use('/job', jobsRouter);
app.use('/auth', authRouter);

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Backend is now listening on port ${port}!`);
});

module.exports = server;
