import type { User, UpdateUserDto, UpdateUserByAdminDto } from '../entities';

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserProfile(): Promise<User>;
  updateUserProfile(data: UpdateUserDto): Promise<User>;
  deleteUserProfile(): Promise<void>;
  updateUserByAdmin(uid: string, data: UpdateUserByAdminDto): Promise<User>;
}