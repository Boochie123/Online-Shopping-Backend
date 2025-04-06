"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTable = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    brand: { type: String, require: true },
    price: { type: Number, require: true },
    qty: { type: Number, require: true },
    image: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    usage: { type: String, require: true },
}, { timestamps: true });
exports.ProductTable = mongoose_1.default.model('Product', productSchema);
