import type { IUserRepository } from '../../repositories';

export class DeleteUserProfile {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<void> {
    return this.userRepository.deleteUserProfile();
  }
}