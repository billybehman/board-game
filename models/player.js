module.exports = function (sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        turnOrder: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        focusRemaining: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 8
        }
    })

    Player.associate = function (models) {
        Player.belongsTo(models.Game, {
            foreignKey: {
                allowNull: true
            }
        })
        Player.hasMany(models.Piece, {
            onDelete: "cascade"
        })
        Player.hasMany(models.Resource, {
            onDelete: "cascade"
        })
    }

    return Player
}

