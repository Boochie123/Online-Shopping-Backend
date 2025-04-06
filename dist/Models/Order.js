"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTable = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: Number, require: true },
    tax: { type: String, require: true },
    total: { type: String, require: true },
    items: [
        {
            name: { type: String, require: true },
            brand: { type: String, require: true },
            price: { type: Number, require: true },
            qty: { type: Number, require: true },
        }
    ]
}, { timestamps: true });
exports.OrderTable = mongoose_1.default.model('Order', orderSchema);
