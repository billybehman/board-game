module.exports = function (sequelize, DataTypes) {
    var Piece = sequelize.define("Piece", {
        bodyCompType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bodyCompLvl: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        astrologyType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        astrologyLvl: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shieldType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shieldLvl: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        movementForward: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        movementDiagonal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        attackType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        attackLvl: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        attackDistance: {
            type: DataTypes.STRING,
            allowNull: true
        },
        intelligenceCollect: {
            type: DataTypes.STRING,
            allowNull: true
        },
        knowledgeCollect: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hitPoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 6
        },
        actionFinished: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    })

    Piece.associate = function (models) {
        Piece.belongsTo(models.Player, {
            foreignKey: {
                allowNull: true
            }
        })
        Piece.belongsTo(models.Tile, {
            foreignKey: {
                allowNull: true
            }
        })
        Piece.belongsTo(models.Game, {
            foreignKey: {
                allowNull: true
            }
        })
    };

    return Piece
}