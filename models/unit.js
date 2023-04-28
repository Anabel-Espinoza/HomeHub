const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Unit extends Model {}

Unit.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_vacant: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true //default: vacant
        },
        move_in_date: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        lease_end_date: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        rent_cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unread_msg: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // default: no new messages
        },
        tenant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tenant',
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
        modelName: 'unit'
    }
)

module.exports = Unit