const appRouter = require('express').Router();
const appController = require('../controllers/appController')
const adminMiddleWare = require('../middlewares/adminMiddleWare')

appRouter.route("/addAirport").post(adminMiddleWare,appController.addAirport)
appRouter.route("/addPort").post(adminMiddleWare,appController.addPort)
appRouter.route("/listPorts").get(adminMiddleWare,appController.listPorts)
appRouter.route("/listAirports").get(adminMiddleWare,appController.listAirports)

module.exports = appRouter;