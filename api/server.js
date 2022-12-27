"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import routes
const test_route_js_1 = __importDefault(require("./routes/test.route.js"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 2820;
// Bypass CORS policy
app.use((0, cors_1.default)({ origin: '*' }));
// Use routes
app.use('/test', test_route_js_1.default);
app.listen(port, () => console.log(`Listening on port ${port}`));
