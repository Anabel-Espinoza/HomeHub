const router = require('express').Router();
const landlordRoutes = require('./landlordRoutes');
const tenantRoutes = require('./tenantRoutes');
const unitRoutes = require('./unitRoutes');
const maintenanceRoutes = require("./maintenanceRoutes");

router.use('/landlords', landlordRoutes);
router.use('/tenants', tenantRoutes);
router.use('/units', unitRoutes);
router.use("/maintenance", maintenanceRoutes);

module.exports = router;
