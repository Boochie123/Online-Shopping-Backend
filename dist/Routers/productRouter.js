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
const Product_1 = require("../Models/Product");
const productRouter = express_1.default.Router();
/*
Upload a product
URL:http://127.0.0.1:5000/api/products/upload
Method:Post
Fields:name,brand,price,qty,category,description,usage
*/
productRouter.post('/upload', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, brand, price, qty, image, category, description, usage } = request.body;
        let product = yield new Product_1.ProductTable({ name, brand, price, qty, image, category, description, usage });
        yield product.save();
        response.status(200).json({ msg: 'product created successfully', product });
    }
    catch (error) {
    }
}));
/*
Get a Mens wear product
URL:http://127.0.0.1:5000/api/products/mens
Method:Get
Fields:no-fidlds
*/
productRouter.get('/mens', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield Product_1.ProductTable.find({ category: "Mens" });
        response.status(200).json(product);
    }
    catch (error) {
        response.status(401).json({ error: error });
    }
}));
/*
Get a Womens wear product
URL:http://127.0.0.1:5000/api/products/womens
Method:Get
Fields:no-fidlds
*/
productRouter.get('/womens', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield Product_1.ProductTable.find({ category: "Womens" });
        response.status(200).json(product);
    }
    catch (error) {
        response.status(401).json({ error: error });
    }
}));
/*
Get a Kids wear product
URL:http://127.0.0.1:5000/api/products/kids
Method:Get
Fields:no-fidlds
*/
productRouter.get('/kids', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield Product_1.ProductTable.find({ category: "Kids" });
        response.status(200).json(product);
    }
    catch (error) {
        response.status(401).json({ error: error });
    }
}));
/*   Get a product by using Id
URL:http://127.0.0.1:5000/api/products/:productId
Method:get
Fields:No-fields
*/
productRouter.get('/:productId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let productid = request.params.productId;
        // console.log(productid);
        let product = yield Product_1.ProductTable.findById(productid);
        response.status(200).json(product);
    }
    catch (error) {
        response.status(401).json({ error: error });
    }
}));
exports.default = productRouter;
