module.exports = (sequelize, DataTypes) => {
    const pets = sequelize.define("pets", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        personality: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hunger: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },
        sleepiness: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },
        fun: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },
        affection: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 20
        },
    });

    return pets;
};
