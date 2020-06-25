module.exports = function (sequelize, DataTypes) {
    var Time = sequelize.define("Time", {
        yearOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearTwo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearThree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearFour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearFive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        turn: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Time
}