const appRouter = require('express').Router();
const appController = require('../controllers/appController')
const adminMiddleWare = require('../middlewares/adminMiddleWare')

appRouter.route("/addAirport").post(adminMiddleWare,appController.addAirport)
appRouter.route("/addPort").post(adminMiddleWare,appController.addPort)
appRouter.route("/listPorts").get(appController.listPorts)
appRouter.route("/listAirports").get(appController.listAirports)

appRouter.route("/getPortById").post(adminMiddleWare,appController.getPortById)
appRouter.route("/getAirportById").post(adminMiddleWare, appController.getAirportById)

appRouter.route("/getIndianPorts").get(appController.getIndianPorts)
appRouter.route("/getIndianAirPorts").get(appController.getIndianAirPorts)

module.exports = appRouter;