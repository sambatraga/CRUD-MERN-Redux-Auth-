"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var configMulter_1 = require("../config/configMulter");
var empControllers_1 = require("../controllers/empControllers");
var userControllers_1 = require("../controllers/userControllers");
var requireAuth_1 = require("../middleware/requireAuth");
var sendmail_1 = require("../middleware/sendmail");
var routes = function (app) {
    app.route("/signUp")
        .post(userControllers_1.signUp);
    app.route("/logIn")
        .post(userControllers_1.logIn);
    app.route("/logOut")
        .get(userControllers_1.logOut);
    app.route("/checkAuth")
        .get(requireAuth_1.requireAuth, userControllers_1.checkAuth);
    app.route("/employe")
        .get(empControllers_1.getAllEmployes)
        .post(configMulter_1.upload.single("photos"), empControllers_1.addEmploye);
    app.route("/employe/:employeID")
        .get(empControllers_1.getEmployeByID)
        .post(configMulter_1.upload.single("photos"), empControllers_1.updateEmploye)
        .delete(empControllers_1.deleteEmploye);
    //send mail
    app.route("/sendMail")
        .post(configMulter_1.upload.single("piece"), sendmail_1.sendmail);
};
exports.routes = routes;
