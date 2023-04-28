const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Landlord extends Model {}

Landlord.init(
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
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
    },
    {
        hooks: {
            beforeCreate: async (newLandlord) => {
                newLandlord.password = await bcrypt.hash(newLandlord.password, 10)
                return newLandlord
            },
            beforeUpdate: async (updatedLandlord) => {
                updatedLandlord.password = await bcrypt.hash(updatedLandlord.password, 10)
                return updatedLandlord;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'landlord'
    }
)

module.exports = Landlord