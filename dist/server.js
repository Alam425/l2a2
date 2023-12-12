"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./config/index"));
const app_1 = __importDefault(require("./app"));
app_1.default.listen(index_1.default.port, () => {
    console.log(`Example app listening on port ${index_1.default.port}`);
});
