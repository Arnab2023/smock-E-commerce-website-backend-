const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Ecommerce Backend API started on PORT NO.: ${port}`);
});

// Path: backend/config/dbConfig.js
