import type { IUserRepository } from '../../domain/repositories';
import type { User, UpdateUserDto, UpdateUserByAdminDto } from '../../domain/entities';
import type { HttpClient } from '../http';

export class UserRepository implements IUserRepository {
  private readonly basePath = '/api/users';

  constructor(private httpClient: HttpClient) {}

  async getAllUsers(): Promise<User[]> {
    const response = await this.httpClient.get<User[]>(`${this.basePath}/`);
    return response.data;
  }

  async getUserProfile(): Promise<User> {
    const response = await this.httpClient.get<User>(`${this.basePath}/profile`);
    return response.data;
  }

  async updateUserProfile(data: UpdateUserDto): Promise<User> {
    const response = await this.httpClient.put<User>(`${this.basePath}/profile`, data);
    return response.data;
  }

  async deleteUserProfile(): Promise<void> {
    await this.httpClient.delete(`${this.basePath}/profile`);
  }

  async updateUserByAdmin(uid: string, data: UpdateUserByAdminDto): Promise<User> {
    const response = await this.httpClient.put<User>(`${this.basePath}/${uid}`, data);
    return response.data;
  }
}