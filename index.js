const express = require("express");
const app = express();
const cors = require("cors");
const connectedDb = require("./models/db");
const session = require("express-session");
const {MongoStore} = require("connect-mongo");
const userRoute = require("./router/userRoute");
const path= require("path")
const adminProfileRoute = require("./router/adminProfileRoute");
require("dotenv").config();

connectedDb();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // ✅ VERY IMPORTANT
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Session config
app.use(
  session({
    name: "cms.sid",
    secret:
      process.env.SESSION_SECRET ||
      "super-secret-session-key",
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // ✅ 1 day (milliseconds)
      httpOnly: true,
      sameSite: "lax",
    },

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      ttl: 60 * 60 * 24, // 1 day (seconds)
    }),
  })
);

// Routes
app.use("/user", userRoute);
app.use("/admin", adminProfileRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
