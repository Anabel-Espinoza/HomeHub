const router = require('express').Router();
const landlordRoutes = require('./landlordRoutes');
const tenantRoutes = require('./tenantRoutes');
const unitRoutes = require('./unitRoutes');
const maintenanceRoutes = require("./maintenanceRoutes");
const logoutRoute = require("./logoutRoute");

router.use('/landlords', landlordRoutes);
router.use('/tenants', tenantRoutes);
router.use('/units', unitRoutes);
router.use("/maintenance", maintenanceRoutes);
router.use("/logout", logoutRoute);

module.exports = router;
