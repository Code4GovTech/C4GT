import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { USER_ROLES } from "../common/enums.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from "bcryptjs";
import config from "../common/config.js";
import jwt from "jsonwebtoken";

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
    circle_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // PostgreSQL only
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    } else {
        throw new ApiError(409, "Password is required");
    }
});

User.beforeUpdate(async (user) => {
    if(user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

User.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

User.prototype.generateAccessToken = function () {
    console.log("generate access token");

    return jwt.sign(
        {
            id: this.id,
            email: this.email,
            name: this.name,
        },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: config.ACCESS_TOKEN_EXPIRATION
        }
    )
}

User.prototype.generateRefreshToken = function () {
    console.log("generate refresh token");
    
    return jwt.sign(
        {
            id: this.id
        },
        config.REFRESH_TOKEN_SECRET,
        {
            expiresIn: config.REFRESH_TOKEN_EXPIRATION
        }
    )
}

export default User;