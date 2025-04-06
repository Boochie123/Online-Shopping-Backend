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
const TokenVerify_1 = __importDefault(require("../Middleware/TokenVerify"));
const User_1 = require("../Models/User");
const Order_1 = require("../Models/Order");
const orderRouter = express_1.default.Router();
/*
To place an order

REST API CONFIGURATION
url:http://127.0.0.1:5000/api/orders/place
method:post
fields:tax,total,items
*/
orderRouter.post('/place', TokenVerify_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.UserTable.findById(response.locals.jwt);
        if (!user) {
            response.status(401).json({ msg: 'user not found' });
            return;
        }
        let { tax, total, items } = request.body;
        let order = new Order_1.OrderTable({
            name: user.name,
            email: user.email,
            mobile: user.address.mobile,
            tax: tax,
            total: total,
            items: items
        });
        yield order.save();
        response.status(200).json({ order });
    }
    catch (error) {
        response.status(401).json({ error: error });
    }
}));
/*
Get all orders

REST API CONFIGURATION
url:http://127.0.0.1:5000/api/orders
method:get
fields:no-fields
*/
orderRouter.get('/', TokenVerify_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.UserTable.findById(response.locals.jwt);
        if (!user) {
            response.status(401).json({ msg: 'user not found' });
            return;
        }
        let orders = yield Order_1.OrderTable.find({ email: user.email });
        response.status(200).json(orders);
    }
    catch (error) {
        response.status(401).json({ error: error });
    }
}));
exports.default = orderRouter;
