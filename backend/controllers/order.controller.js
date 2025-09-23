import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import stripe from "stripe"
import User from "../models/user.model.js"


// Place order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ message: "Invalid order details", success: false });
    }
    // calculate amount using items;
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add tex charfe 2%
    amount += Math.floor((amount * 2) / 100);
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false
    });
    return res.json({ message: "Order placed successfully", success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// Place order COD: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
        const { address, items } = req.body;
    const { origin } = req.headers;


    if (!address || items.length === 0) {
      return res.json({ message: "Invalid order details", success: false });
    }

    let productData = [];

    // calculate amount using items;
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add tex charfe 2%
    amount += Math.floor((amount * 2) / 100);
    const order = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "online",
    });

    //Stripe Gatway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    //Create line items for stripe

    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + 0.02) * 100
        },
        quantity: item.quantity,
      }
    })

    //create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      payment_intent_data: {
                metadata: {
                    orderId: order._id.toString(),
                    userId
                }
            }
    })
    return res.json({ success: true, url: session.url });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//stripe webhooks to verify payment action : /stripe
export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    response.status(400).send(`webhook Error: ${error.message}`)
  }

  //handle the event 
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      //getting session metadeta
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId, userId } = session.data[0].metadata;

      //mark payment as paid
      await Order.findByIdAndUpdate(orderId, {isPaid: true})
      //clear user cart
      await User.findByIdAndUpdate(userId, {cartItems: {}});
      break;
    }
    case "payment_intent.payment_failed": {
       const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      //getting session metadeta
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId } = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
      break;


    }


    default:
      console.error(`Unhabndled event type ${event.type}`)
      break;
  }
    response.json({received: true});
}


// oredr details for individual user :/api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        // Include all orders for this user
        const orders = await Order.find({ userId }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// get all orders for admin :/api/order/seller

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

