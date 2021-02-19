module.exports = function (sequelize, DataTypes) {
    var Tile = sequelize.define("Tile", {
        x: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        y: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // z: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        resType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resAmount: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        occupied: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        hasPortal: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        terrain: {
            type: DataTypes.STRING,
            allowNull: false
        }


    })

    Tile.associate = function (models) {
        Tile.hasOne(models.Piece, {
            onDelete: "cascade"
        })
        Tile.belongsTo(models.Game, {
            foreignKey: {
                allowNull: true
            }
        })
    }

    return Tile
}