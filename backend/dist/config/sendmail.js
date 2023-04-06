"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let testAccount = yield nodemailer_1.default.createTestAccount();
    let transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
    let message = Object.assign(Object.assign({}, req.body), { from: testAccount.user });
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log("Erreur lors de l'envoie", err);
            res.send("erreur");
        }
        else {
            console.log("message envoyé avec succès ", info);
            res.send("succès");
        }
    });
});
exports.sendmail = sendmail;
