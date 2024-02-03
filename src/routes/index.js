const UserRouter = require('../routes/UserRouter');
const ProductRouter = require('../routes/ProductRouter');
const routes = (App) => {
    App.use('/api/user', UserRouter);
    App.use('/api/product', ProductRouter);
};
module.exports = routes;
