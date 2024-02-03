const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authMiddleWare = (req, res, next) => {
    const token = req.headers.Authorization;
    if (!token) {
        return res.status(500).json({
            message: 'acccess token undifined',
        });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'The authemticcation',
                });
            }
            const { payload } = User;
            if (payload?.isAdmin) {
                next();
            } else {
                return res.status(500).json({
                    message: 'The authemticcation',
                });
            }
        });
    }
};
const authUserMiddleWare = (req, res, next) => {
    const UserDetailId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(500).json({
            message: 'Access token required',
        });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
            // Thay User thành user
            if (err) {
                return res.status(500).json({
                    ...err,
                });
            }
            const { payload } = user;
            if (payload?.isAdmin || payload?.id == UserDetailId) {
                next();
            } else {
                return res.status(500).json({
                    message: 'Authentication failed',
                });
            }
        });
    }
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
};
