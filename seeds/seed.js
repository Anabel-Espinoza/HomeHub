const sequelize = require("../config/connection");
const { Landlord, Tenant, Unit, Maintenance } = require("../models/index");

const landlordData = require("./landlordData.json");
const maintenanceData = require("./maintenanceData.json");
const propertyData = require("./propertyData.json");
const tenantData = require("./tenantData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Landlord.bulkCreate(landlordData, {
        individualHooks: true,
        returning: true,
    });

    await Tenant.bulkCreate(tenantData, {
        individualHooks: true,
        returning: true,
    });

    await Unit.bulkCreate(propertyData);

    await Maintenance.bulkCreate(maintenanceData);

    process.exit(0);
};

seedDatabase();