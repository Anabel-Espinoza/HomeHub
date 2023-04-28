const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Maintenance extends Model {}

Maintenance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_submitted: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW //default: today
        },
        is_closed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, // default: open
        },
        repair_cost: {
            type: DataTypes.FLOAT,
        },
        tenant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tenant',
                key: 'id'
            }
        },
        unit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'unit',
                key: 'id'
            }
        },
        landlord_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'landlord',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'maintenance'
    }
)

module.exports = Maintenance