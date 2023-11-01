const createHandler = require("azure-function-express").createHandler;
const app = require("./server.js");
module.exports = createHandler(app);
