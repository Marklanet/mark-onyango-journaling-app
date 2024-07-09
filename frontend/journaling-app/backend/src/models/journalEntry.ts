import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db';
import User from './user';  // Import the User model

class JournalEntry extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public category!: string;
  public date!: Date;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JournalEntry.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'journal_entries',
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['date'],
      },
    ],
  }
);

// Define foreign key relationship
JournalEntry.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(JournalEntry, { foreignKey: 'userId' });

export default JournalEntry;
