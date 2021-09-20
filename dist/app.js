"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var model_1 = __importDefault(require("@core/model"));
console.log(model_1.default);
dotenv_1.default.config();
var port = process.env.PORT || '3000';
var app = (0, express_1.default)();
app.use(cors_1.default);
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('The server is working!');
});
app.listen(port, function () {
    console.log("server is listening on " + port + " !!!");
});
