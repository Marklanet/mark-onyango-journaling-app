
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db';
import bcrypt from 'bcrypt';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance method to check password
  public async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // Ensure Sequelize handles createdAt and updatedAt
  }
);

export default User;
