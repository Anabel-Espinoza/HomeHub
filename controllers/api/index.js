const router = require('express').Router();
const landlordRoutes = require('./landlordRoutes');
const tenantRoutes = require('./tenantRoutes');
const unitRoutes = require('./unitRoutes');
const maintenanceRoutes = require("./maintenanceRoutes");
const logoutRoute = require("./logoutRoute");
const convoRoute = require("./convoRoutes");
const commentRoute = require("./commentRoutes");

router.use('/landlords', landlordRoutes);
router.use('/tenants', tenantRoutes);
router.use('/units', unitRoutes);
router.use("/maintenance", maintenanceRoutes);
router.use("/logout", logoutRoute);
router.use("/convo", convoRoute);
router.use("/comment", commentRoute);

module.exports = router;
