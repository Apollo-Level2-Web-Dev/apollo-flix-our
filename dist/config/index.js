"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: 3000,
    databse_url: "mongodb+srv://crud:Mc1zQNjVv177npFx@cluster0.awbitmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
};
