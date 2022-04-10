const appRouter = require('express').Router();
const appController = require('../controllers/appController')
const adminMiddleWare = require('../middlewares/adminMiddleWare')

appRouter.route("/addCountry").post(adminMiddleWare,appController.addCountry)
appRouter.route("/addPortToCountry").post(adminMiddleWare,appController.addPortToCountry)
appRouter.route("/addAirportToCountry").post(adminMiddleWare,appController.addAirportToCountry)
appRouter.route("/getPortsByCountry").post(appController.getPorts)
appRouter.route("/getAirportsByCountry").post(appController.getAirports)
appRouter.route("/listCountries").get(appController.listCountries)

module.exports = appRouter;