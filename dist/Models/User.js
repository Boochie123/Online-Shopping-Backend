"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
    address: {
        flat: { type: String },
        street: { type: String },
        landmark: { type: String },
        city: { type: String },
        mobile: { type: String },
        state: { type: String },
        pin: { type: String },
        country: { type: String },
    },
}, { timestamps: true });
exports.UserTable = mongoose_1.default.model("user", userSchema);
