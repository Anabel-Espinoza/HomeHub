const Landlord = require('./landlord')
const Tenant = require('./tenant')
const Unit = require('./unit')
const Maintenance = require('./maintenance')

Landlord.hasMany(Unit, {
    foreignKey: "landlord_id",
    onDelete: 'CASCADE'
})

Unit.belongsTo(Landlord, {
    foreignKey: 'landlord_id'
})

Unit.hasOne(Tenant, {
    foreignKey: "tenant_id",
})

Tenant.belongsTo(Unit, {
    foreignKey: "tenant_id"
})

Tenant.hasMany(Maintenance, {
    foreignKey: 'tenant_id',
})

Maintenance.belongsTo(Tenant, {
    foreignKey: 'tenant_id'
})

Unit.hasMany(Maintenance, {
    foreignKey: 'unit_id'
})

Maintenance.belongsTo(Unit, {
    foreignKey: "unit_id"
})

Landlord.hasMany(Maintenance, {
    foreignKey: 'landlord_id'
})

Maintenance.belongsTo(Landlord, {
    foreignKey: 'landlord_id'
})

module.exports = { Landlord, Tenant, Unit, Maintenance }