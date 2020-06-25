module.exports = function (sequelize, DataTypes) {
    var Resource = sequelize.define("Resource", {
        vision: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultVaue: 0
        },
        stamina: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultVaue: 0
        },
        power: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultVaue: 0
        },
        vibration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultVaue: 0
        },
        craft: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultVaue: 0
        },
        accuracy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        muscle: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        intelligence: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        knowledge: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        coordination: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        reach: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        illumination: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        divinity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        seed: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        force: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        encription: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        electric: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        lung: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        bone: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        blood: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        salt: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        keratin: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        spike: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        gold: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        hydrogen: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        seed: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        plastic: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        metal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        copper: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
    })

    // Resource.associate = function (models) {
    //     Resource.belongsTo(models.Player, {
    //         foreignKey: {
    //             allowNull: true
    //         }
    //     });
    // };

    return Resource
}