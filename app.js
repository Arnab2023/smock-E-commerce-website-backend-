const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const errorHandler = require("./middlewares/errorHandlers");
const adminRoutes = require("./routes/AdminRoutes");
const productRoutes = require("./routes/ProductRoutes");
const subscribersRoutes = require("./routes/SubscriberRoutes");
const productSecureRoutes = require("./routes/ProductSecureRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const categorySecureRoutes = require("./routes/CategorySecureRoutes");
const OrdersRoutes = require("./routes/ordersRoutes");
const TransactionRoutes = require("./routes/TransactionRoutes");
const eventsSecureRoutes = require("./routes/EventsSecurRoutes");
const eventsRoutes = require("./routes/EventsRoutes");
const couponsRoutes = require("./routes/CouponRoutes");
const couponsSecureRoutes = require("./routes/CouponSecureRoutes");
const cartRoutes = require("./routes/CartRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const addressRoutes = require("./routes/AddressRoutes");
const checkoutRoutes = require("./routes/CheckoutRoutes");
const ConnectDB = require("./config/dbConfig");

ConnectDB();

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (process.env.ALLOWED_ORIGINS.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use("/api/admins/", adminRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/products/secure/", productSecureRoutes);
app.use("/api/coupons/", couponsRoutes);
app.use("/api/coupons/secure/", couponsSecureRoutes);
app.use("/api/events/secure/", eventsSecureRoutes);
app.use("/api/events/", eventsRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/category/secure/", categorySecureRoutes);
app.use("/api/subscribers/", subscribersRoutes);
app.use("/api/orders/", OrdersRoutes);
app.use("/api/transactions/", TransactionRoutes);
app.use("/api/cart/", cartRoutes);
app.use("/api/wishlist/", wishlistRoutes);
app.use("/api/address/", addressRoutes);
app.use("/api", checkoutRoutes);
app.use(errorHandler);

module.exports = app;
