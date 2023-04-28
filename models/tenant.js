const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

class Tenant extends Model {}

Tenant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newTenant) => {
                newTenant.password = await bcrypt.hash(newTenant.password, 10)
                return newTenant
            },
            beforeUpdate: async (updatedTenant) => {
                updatedTenant.password = await bcrypt.hash(updatedTenant.password, 10)
                return updatedTenant
            }

        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tenant'
    }
)

module.exports = Tenant