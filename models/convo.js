const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Convo extends Model {}

Convo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_submitted: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW //default: today
        },
        tenant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'convo'
    }
)

module.exports = Convo;