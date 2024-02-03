const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {
    authMiddleWare,
    authUserMiddleWare,
} = require('../MiddleWare/authMiddleWare');
router.post('/sign-up', UserController.CreateUser);
router.post('/sign-in', UserController.LoginUser);
router.put('/update-user/:id', UserController.UpdateUser);
router.delete('/delete-user/:id', authMiddleWare, UserController.DeleteUser);
router.get('/getAllUser', authMiddleWare, UserController.GetAllUser);
router.get(
    '/detail-user/:id',
    authUserMiddleWare,
    UserController.GetDetailUser
);
router.post('/refresh-token', UserController.RefreshToken);
module.exports = router;
