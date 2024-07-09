import jwt from 'jsonwebtoken';
import { User } from '../models/index';
const secretKey = process.env.JWT_SECRET || 'secret';

export const getUserFromToken = async (token: string): Promise<any> => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded: any = jwt.verify(token, secretKey);

    const userId = decoded.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export default getUserFromToken;
