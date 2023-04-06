"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var stockage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(path_1.default.dirname(process.argv[1]), '/public/'));
    },
    filename: function (req, file, cb) {
        cb(null, "".concat(Date.now(), ".").concat(file.mimetype.split("/")[1]));
    }
});
exports.upload = (0, multer_1.default)({ storage: stockage });
