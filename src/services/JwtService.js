const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccesstoken = async (payload) => {
    const access_token = jwt.sign(
        {
            payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '30s' }
    );
    return access_token;
};
const generalRefreshToken = async (payload) => {
    const referesh_token = jwt.sign(
        {
            payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' }
    );
    return referesh_token;
};
const RefreshTokenService = async (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(
                token,
                process.env.REFRESH_TOKEN,
                async function (err, User) {
                    if (err) {
                        reject({
                            code: 500,
                            message: 'The authemtication',
                        });
                    }
                    const { payload } = User;
                    const access_token = await generalAccesstoken(payload);
                    resolve({
                        status: 200,
                        message: 'refresh token successfully',
                        access_token,
                    });
                }
            );
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    generalAccesstoken,
    generalRefreshToken,
    RefreshTokenService,
};
