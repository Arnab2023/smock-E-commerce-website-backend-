const http = require("http");
const app = require("./app");
const cors = require("cors");
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "https://smock-e-commerce-website-frontend.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ecommerce-frontend-opal-sigma.vercel.app",
  ],
};

app.use(cors(corsOptions));
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Ecommerce Backend API started on PORT NO.: ${port}`);
});

// Path: backend/config/dbConfig.js
