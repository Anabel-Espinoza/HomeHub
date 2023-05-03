const Landlord = require('./landlord')
const Tenant = require('./tenant')
const Unit = require('./unit')
const Maintenance = require('./maintenance')
const Convo = require("./convo")
const Comment = require("./comment");

Landlord.hasMany(Unit, {
    foreignKey: "landlord_id",
    onDelete: 'CASCADE'
})

Unit.belongsTo(Landlord, {
    foreignKey: 'landlord_id'
})

Tenant.hasOne(Unit, {
    foreignKey: "tenant_id",
})

Unit.belongsTo(Tenant, {
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

//new convo feature starts here

Tenant.hasMany(Convo, {
    foreignKey: "tenant_id"
})

Convo.belongsTo(Tenant, {
    foreignKey: "tenant_id"
})

Landlord.hasMany(Convo, {
    foreignKey: "landlord_id"
})

Convo.belongsTo(Landlord, {
    foreignKey: "landlord_id"
})

Convo.hasMany(Comment, {
    foreignKey: "convo_id"
})

Tenant.hasMany(Comment, {
    foreignKey: "tenant_id"
})

Landlord.hasMany(Comment, {
    foreignKey: "landlord_id"
})

Comment.belongsTo(Convo, {
    foreignKey: "convo_id"
})

Comment.belongsTo(Tenant, {
    foreignKey: "tenant_id"
})

Comment.belongsTo(Landlord, {
    foreignKey: "landlord_id"
})

module.exports = { Landlord, Tenant, Unit, Maintenance, Convo, Comment }