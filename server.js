const http = require("http");
const app = require("./app");
const { connectToMongodb } = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

connectToMongodb();

server.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
