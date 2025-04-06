import express, { Request, Response } from "express";
import Stripe from "stripe"; // Import Stripe properly

const stripe = new Stripe("sk_test_51R3PdI03Katgf0PvgycHuLd55nREC3PZsgYb7RbINnYzcXPgISmHIcz8et54aQNXxlLkKOs1d5NfQbQwNcj6Er9o00RS781VuN", {
    apiVersion: '2025-02-24.acacia', // Make sure to use the latest API version
});

const paymentsRouter: express.Router = express.Router();

paymentsRouter.post("/create-checkout-session", async (req: Request, res: Response): Promise<void> => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            console.error("❌ Error: Invalid products data", req.body);
            res.status(400).json({ error: "Products array is required" });
            return; // ✅ Ensure you return to prevent further execution
        }

        const lineItems = products.map((product: any) => ({
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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        console.log("✅ Session created:", session);

        res.json({ id: session.id });
    } catch (error) {
        console.error("❌ Stripe session error:", error);
        res.status(500).json({ error: (error as Error).message || "Internal Server Error" });
    }
});
export default paymentsRouter;