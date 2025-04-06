"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const userRouter_1 = __importDefault(require("../Routers/userRouter"));
const productRouter_1 = __importDefault(require("../Routers/productRouter"));
const paymentsRouter_1 = __importDefault(require("../Routers/paymentsRouter"));
const orderRouter_1 = __importDefault(require("../Routers/orderRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const port = process.env.PORT || 5000;
if (process.env.MONGO_DB_URL !== undefined) {
    mongoose_1.default.connect(process.env.MONGO_DB_URL).then(() => {
        console.log(`Connected to Mongodb successfully`);
    }).catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
app.get('/', (request, response) => {
    response.end(`<h2>ExpressJs server backend</h2>`);
});
app.use('/api/users', userRouter_1.default);
app.use('/api/products', productRouter_1.default);
app.use('/api/orders', orderRouter_1.default);
app.use('/api/payments', paymentsRouter_1.default);
app.listen(port, () => {
    console.log(`Expressjs server started at ${port}`);
});
