"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const employeSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String
    },
    date_naissance: {
        type: Date,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    status: {
        marie: {
            type: Boolean,
            require: true
        },
        parent: {
            type: Boolean,
            require: true
        }
    },
});
exports.EmployeModel = mongoose_1.default.model("employes", employeSchema);
