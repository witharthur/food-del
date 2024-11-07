
// controler
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
    const currency = req.body.currency || "usd";

    try {
        // Validate request
        if (!req.body.userId || !req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid request data"
            });
        }

        // Create Stripe line items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: item.quantity,
        }));

        // Add delivery fee
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Fee",
                },
                unit_amount: 200, // $2.00 in cents
            },
            quantity: 1,
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontend_url}/cancel`,
            metadata: {
                userId: req.body.userId,
                address: JSON.stringify(req.body.address)
            }
        });

        res.json({ 
            success: true, 
            session_url: session.url 
        });

    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Order placement failed: " + error.message,
            error: error.message 
        });
    }
};

export { placeOrder };