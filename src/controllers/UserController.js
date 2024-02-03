const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const CreateUser = async (req, res) => {
    try {
        const response = await UserService.CreateUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e,
        });
    }
};

const LoginUser = async (req, res) => {
    try {
        const response = await UserService.LoginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', `Bearer ${refresh_token}`, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 360000,
        });
        console.log(newResponse);
        // document.cookie =
        //     'username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC';
        return res.status(200).json(newResponse);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const UserId = req.params.id;
        if (!UserId) {
            return res.status(500).json({ message: 'User id is require' });
        }
        const Result = await UserService.UpdateUser(UserId, req.body);
        return res.status(200).json(Result);
    } catch (e) {
        return res.status(500).json({ e });
    }
};
const DeleteUser = async (req, res) => {
    try {
        const UserId = req.params.id;
        if (!UserId) {
            return res.status(500).json({ message: 'User id is require' });
        }
        const Result = await UserService.DeleteUser(UserId, req.body);
        return res.status(200).json(Result);
    } catch (e) {
        return res.status(500).json({ e });
    }
};
const GetAllUser = async (req, res) => {
    try {
        const Result = await UserService.GetAllUser();
        return res.status(200).json({
            Result,
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Get all user fail',
        });
    }
};
const GetDetailUser = async (req, res) => {
    try {
        const UserId = req.params.id;
        if (!UserId) {
            return res.status(500).json({
                status: 500,
                message: 'User id is undifined',
            });
        }
        const Result = await UserService.GetDetailUser(UserId);
        return res.status(200).json(Result);
    } catch (e) {
        return res.status(500).json({
            message: 'get detail user fail',
            err: e,
        });
    }
};
const RefreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token.split(' ')[1];
        console.log('request :', req.cookies);
        if (!token) {
            return res.status(500).json({
                message: 'Token is required',
            });
        } else {
            const Result = await JwtService.RefreshTokenService(token);
            return res.status(200).json(Result);
        }
    } catch (e) {
        return res.status(500).json(e);
    }
};
module.exports = {
    CreateUser,
    LoginUser,
    UpdateUser,
    DeleteUser,
    GetAllUser,
    GetDetailUser,
    RefreshToken,
};
