import type { User, UpdateUserDto } from '../../entities';
import type { IUserRepository } from '../../repositories';

export class UpdateUserProfile {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: UpdateUserDto): Promise<User> {
    if (!data.name && !data.email && !data.phone && !data.picture) {
      throw new Error('Al menos un campo debe ser proporcionado para actualizar.');
    }
    return this.userRepository.updateUserProfile(data);
  }
}