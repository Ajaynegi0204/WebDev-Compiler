"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerRouter = void 0;
const express_1 = __importDefault(require("express"));
const compilerController_1 = require("../controllers/compilerController");
const VerifyTokenAnonymous_1 = require("../middlewares/VerifyTokenAnonymous");
const verifyToken_1 = require("../middlewares/verifyToken");
exports.compilerRouter = express_1.default.Router();
exports.compilerRouter.post("/save", VerifyTokenAnonymous_1.VerifyTokenAnonymous, compilerController_1.saveCode);
exports.compilerRouter.delete('/delete/:id', verifyToken_1.verifyToken, compilerController_1.deleteCode);
exports.compilerRouter.put('/edit/:id', verifyToken_1.verifyToken, compilerController_1.editCode);
exports.compilerRouter.post("/load", VerifyTokenAnonymous_1.VerifyTokenAnonymous, compilerController_1.loadCode);
exports.compilerRouter.get("/get-all-codes", compilerController_1.getAllCodes);
