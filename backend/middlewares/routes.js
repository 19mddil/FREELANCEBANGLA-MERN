const homeRouter = require('../routers/homeRouter');
const userRouter = require('../routers/userRouter');
const clientJobRouter = require('../routers/clientJobRouter');
const workerJobRouter = require('../routers/workerJobRouter');

module.exports = (app) => {
    app.use(homeRouter);
    app.use('/user', userRouter);
    app.use('/user/client/job', clientJobRouter);
    app.use('/user/worker/job', workerJobRouter);
}