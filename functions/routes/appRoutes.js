const appRouter = require('express').Router();
const appController = require('../controllers/appController')

appRouter.route("/addCountry").post(appController.addCountry)
appRouter.route("/addPortToCountry").post(appController.addPortToCountry)
appRouter.route("/addAirportToCountry").post(appController.addAirportToCountry)
appRouter.route("/getPortsByCountry").post(appController.getPorts)
appRouter.route("/getAirportsByCountry").post(appController.getAirports)
appRouter.route("/listCountries").get(appController.listCountries)

module.exports = appRouter;