import type { User } from '../../entities';
import type { IUserRepository } from '../../repositories';

export class GetAllUsers {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}