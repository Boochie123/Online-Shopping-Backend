"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../Models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const gravatar_1 = __importDefault(require("gravatar"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenVerify_1 = __importDefault(require("../Middleware/TokenVerify"));
const { check, validationResult } = require('express-validator');
const userRouter = express_1.default.Router();
//Register a user
/*
REST API CONFIGURATION
URL:http://127.0.0.1:5000/api/users/register
METHOD:POST
FIELDS:Name,email,password,password,confirm password
*/
userRouter.post('/register', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please provide a valid email'), // Add more validation if needed
    check('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
], (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        let { name, email, password, isAdmin } = request.body;
        console.log(request.body);
        //Check if user exists
        let user = yield User_1.UserTable.findOne({ email: email });
        if (user) {
            response.status(401).json({ msg: 'User already exists' });
            return;
        }
        let salt = yield bcryptjs_1.default.genSalt(10);
        let hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        //avatar url for email
        let avatar = gravatar_1.default.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        //default address
        let address = {
            flat: '',
            street: '',
            landmark: '',
            city: '',
            mobile: '',
            state: '',
            pin: '',
            country: ''
        };
        //create a user(register)
        let newUser = new User_1.UserTable({ name, email, password: hashedPassword, avatar, address, isAdmin });
        newUser = yield newUser.save();
        response.status(200).json({ msg: 'Registration success' });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ errors: error });
    }
}));
//login user
/*
REST API CONFIGURATION
URL:http://127.0.0.1:5000/api/users/login
METHOD:POST
FIELDS:email,password
*/
userRouter.post('/login', [
    check('email').not().isEmpty().withMessage('Email is required'),
    check('password').not().isEmpty().withMessage('Password is required')
], (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        let { email, password } = request.body;
        let user = yield User_1.UserTable.findOne({ email: email });
        if (!user) {
            response.status(401).json({ msg: 'invalid email address' });
            return;
        }
        if (typeof user.password !== 'string') {
            response.status(401).json({ msg: 'Invalid password' });
            return;
        }
        let isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            response.status(401).json({ msg: 'Invalid password' });
            return;
        }
        //create a token
        let payload = {
            user: {
                id: user.id,
                name: user.name,
                isAdmin: user.isAdmin
            }
        };
        jsonwebtoken_1.default.sign(payload, 'sshhhh', (err, token) => {
            if (err)
                throw err;
            response.status(200).json({
                msg: 'login is success',
                token: token
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
//get login user info
/*
REST API CONFIGURATION
URL:http://127.0.0.1:5000/api/users
METHOD:Get
FIELDS:No-fields
*/
userRouter.get('/', TokenVerify_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.UserTable.findById(response.locals.jwt);
        if (!user) {
            // If no user is found, return a 404 or appropriate error
            response.status(404).json({ msg: 'User not found' });
            return;
        }
        response.status(200).json(user);
        return;
    }
    catch (error) {
        response.status(401).json({ msg: error });
        return;
    }
}));
//create or update address
/*
REST API CONFIGURATION
URL:http://127.0.0.1:5000/api/users/address
METHOD:post
FIELDS:flat,street,landmark,city,country,pin,mobile,state
*/
userRouter.post('/address', TokenVerify_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { flat, street, landmark, city, country, pin, mobile, state } = request.body;
        const user = yield User_1.UserTable.findById(response.locals.jwt);
        if (!user) {
            response.status(404).json({ msg: 'User not found' });
            return;
        }
        let address = {
            flat: flat,
            street: street,
            landmark: landmark,
            city: city,
            mobile: mobile,
            state: state,
            pin: pin,
            country: country
        };
        console.log('Address to be updated:', address);
        // Update the user's address in the database
        user.address = address;
        yield user.save(); // Ensure save is awaited
        response.status(200).json({ msg: 'Address updated successfully', address: user.address });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ msg: 'Error updating address', error: error });
    }
}));
exports.default = userRouter;
