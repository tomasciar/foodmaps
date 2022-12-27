"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_controller_js_1 = __importDefault(require("../controllers/test.controller.js"));
const router = express_1.default.Router();
router.route('/testFunction').get(test_controller_js_1.default.testFunction);
exports.default = router;
