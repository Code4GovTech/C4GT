import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { USER_ROLES } from "../common/enums";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },      
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(USER_ROLES.ADMIN, USER_ROLES.OFFICER),
        defaultValue: USER_ROLES.OFFICER,
        allowNull: false,
    },
    circle: {
        type: DataTypes.STRING,
        allowNull: false,
    },   
}, {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default User;