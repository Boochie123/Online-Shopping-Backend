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
const stripe_1 = __importDefault(require("stripe")); // Import Stripe properly
const stripe = new stripe_1.default("sk_test_51R3PdI03Katgf0PvgycHuLd55nREC3PZsgYb7RbINnYzcXPgISmHIcz8et54aQNXxlLkKOs1d5NfQbQwNcj6Er9o00RS781VuN", {
    apiVersion: '2025-02-24.acacia', // Make sure to use the latest API version
});
const paymentsRouter = express_1.default.Router();
paymentsRouter.post("/create-checkout-session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.body;
        if (!products || !Array.isArray(products) || products.length === 0) {
            console.error("❌ Error: Invalid products data", req.body);
            res.status(400).json({ error: "Products array is required" });
            return; // ✅ Ensure you return to prevent further execution
        }
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: product.image && product.image.length <= 2048 ? [product.image] : [], // ✅ Only add valid image URLs
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity || 1,
        }));
        console.log("✅ Line Items:", lineItems);
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });
        console.log("✅ Session created:", session);
        res.json({ id: session.id });
    }
    catch (error) {
        console.error("❌ Stripe session error:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}));
exports.default = paymentsRouter;
