module.exports = (sequelize, DataTypes) => {
    const dialogues = sequelize.define('dialogues', {
        personality_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        question_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        question_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return dialogues;
};
