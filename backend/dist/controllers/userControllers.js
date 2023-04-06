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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.logOut = exports.logIn = exports.signUp = void 0;
var userModels_1 = require("../models/userModels");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, newUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.body;
                _a = user;
                return [4 /*yield*/, bcryptjs_1.default.hash(user.password, 8)];
            case 1:
                _a.password = _b.sent();
                newUser = new userModels_1.UserModel(user);
                newUser.save().then(function (user) { return res.json(user); })
                    .catch(function (err) {
                    console.log(err);
                    res.sendStatus(400);
                });
                return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var logIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, passwordMatch, exp, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModels_1.UserModel.findOne({ email: email })
                    //retourner une erreur 401(bad request) si l'utilisateur n'existe pas
                ];
            case 1:
                user = _b.sent();
                //retourner une erreur 401(bad request) si l'utilisateur n'existe pas
                if (!user)
                    return [2 /*return*/, res.sendStatus(401)
                        //comparer les mdps
                    ];
                passwordMatch = bcryptjs_1.default.compareSync(password, user.password);
                //si les passwords ne sont pas les mêmes
                if (!passwordMatch)
                    return [2 /*return*/, res.sendStatus(401)
                        //créer un jwt token
                        //expiration
                    ];
                exp = Date.now() + 1000 * 60 * 60 * 24;
                token = jsonwebtoken_1.default.sign({ sub: user._id, exp: exp }, "HJ5FD5FDFD8WER94ERGT4HYERH4Q4F157A5ASD5");
                res.cookie("Authorization", token, { expires: new Date(exp), httpOnly: true, sameSite: "lax", secure: false });
                res.send("OK");
                return [2 /*return*/];
        }
    });
}); };
exports.logIn = logIn;
var logOut = function (req, res) {
    res.clearCookie("Authorization");
    res.send("deconnexion");
    //res.send("coucou")
    // console.log(req.cookies)
    //  console.log(JSON.stringify(req.cookies))
};
exports.logOut = logOut;
var checkAuth = function (req, res) {
    res.json(req.user);
};
exports.checkAuth = checkAuth;
