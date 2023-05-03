const sequelize = require("../config/connection");
const { Landlord, Tenant, Unit, Maintenance, Convo, Comment } = require("../models/index");

const landlordData = require("./landlordData.json");
const maintenanceData = require("./maintenanceData.json");
const propertyData = require("./propertyData.json");
const tenantData = require("./tenantData.json");
const convoData = require("./convoData.json");
const commentData = require("./commentData.json");

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

    await Convo.bulkCreate(convoData);

    await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();