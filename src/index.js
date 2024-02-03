const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3003;
dotenv.config();
const App = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Thay đổi thành địa chỉ của ứng dụng ReactJS của bạn
    credentials: true, // Cho phép sử dụng cookies và các tiêu đề khác liên quan đến xác thực
};

App.use(cors(corsOptions));
App.use(cookieParser());
App.use(bodyParser.json());
routes(App);
mongoose.connect(`${process.env.MONGO_DB}`).then(() => {
    console.log('Connect database successfully');
});
App.listen(PORT, () => {
    console.log('Server is listening on por: ' + PORT);
});
