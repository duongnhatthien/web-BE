const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const JwtService = require('./JwtService');
const dotenv = require('dotenv');
dotenv.config();

const CreateUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const Salt = bcrypt.genSaltSync();
        const { email, name, phone, password, passwordConfirm, isAdmin } =
            newUser;
        const hashPassword = bcrypt.hashSync(password, Salt);
        // Sử dụng User.create trả về một promise
        User.create({
            name,
            email,
            password: hashPassword,
            phone,
            isAdmin,
        })
            .then((createdUser) => {
                resolve({
                    status: true,
                    message: 'create user sucessfully',
                    data: createdUser,
                });
            })
            .catch((error) => {
                // Kiểm tra nếu là lỗi duplicate key
                if (
                    error.code === 11000 &&
                    error.keyPattern &&
                    error.keyValue
                ) {
                    reject({
                        status: false,
                        message: `Registered phone number and email`,
                        errorCode: 11000,
                    });
                } else {
                    // Xử lý các loại lỗi khác
                    console.error('Error creating user:', error);
                    reject({
                        status: false,
                        message: 'Error creating user',
                    });
                }
            });
    });
};
const LoginUser = (UserLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = UserLogin;
        User.findOne({
            email: email,
        })
            .then(async (Result) => {
                if (Result === null) {
                    reject({
                        status: 404,
                        message: 'Not found email',
                    });
                } else {
                    const confirmPassword = bcrypt.compareSync(
                        password,
                        Result.password
                    );
                    if (confirmPassword) {
                        const access_token =
                            await JwtService.generalAccesstoken({
                                id: Result.id,
                                isAdmin: Result.isAdmin,
                            });
                        const refresh_token =
                            await JwtService.generalRefreshToken({
                                id: Result.id,
                                isAdmin: Result.isAdmin,
                            });
                        resolve({
                            status: 200,
                            message: 'Login successfully',
                            name: Result.name,
                            access_token,
                            refresh_token,
                        });
                    } else {
                        resolve({
                            status: 500,
                            message: 'Password is correct',
                        });
                    }
                }
            })
            .catch((err) => {
                reject({
                    status: 500,
                    message: 'Login fail',
                    error: err,
                });
            });
    });
};
const UpdateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, data, { new: true })
            .then((result) => {
                if (result == null) {
                    resolve({
                        status: 404,
                        message: 'Not found record',
                    });
                } else {
                    resolve({
                        status: 200,
                        message: 'Updated',
                    });
                }
            })
            .catch((e) => {
                reject({
                    status: 500,
                    error: e,
                });
            });
    });
};
const DeleteUser = (UserId) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(UserId).then((result) => {
            if (result) {
                resolve({
                    status: 200,
                    message: 'Delete user successfully',
                });
            } else {
                resolve({
                    status: 404,
                    message: 'Not found user',
                });
            }
        });
    });
};
const GetAllUser = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .then((result) => {
                resolve({
                    status: 200,
                    message: 'get all users successfully',
                    data: result,
                });
            })
            .then((err) => {
                reject(err);
            });
    });
};
const GetDetailUser = (UserId) => {
    return new Promise((resolve, reject) => {
        
        User.findById({ _id: UserId })
            .then((result) => {
                resolve({
                    status: 200,
                    message: 'get detail user successfully',
                    data: result,
                });
            })
            .catch((e) => {
                reject(e);
            });
    });
};
module.exports = {
    GetDetailUser,
    CreateUser,
    LoginUser,
    UpdateUser,
    DeleteUser,
    GetAllUser,
};
