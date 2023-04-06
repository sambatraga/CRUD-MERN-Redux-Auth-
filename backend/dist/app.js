"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var empRoutes_1 = require("./routes/empRoutes");
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var PORT = 2000;
var corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
//connexion base de données
mongoose_1.default.connect("mongodb://localhost:27017/GestionEmploye");
//middlewares
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(path_1.default.dirname(process.argv[1]), "/public")));
(0, empRoutes_1.routes)(app);
//telecharger une image depuis react
app.post("/upload", function (req, res) {
    console.log(req);
});
app.listen(PORT, function () { return console.log("cette appli \u00E9coute sur le port ".concat(PORT)); });
