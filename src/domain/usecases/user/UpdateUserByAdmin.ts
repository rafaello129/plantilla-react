import type { User, UpdateUserByAdminDto } from '../../entities';
import type { IUserRepository } from '../../repositories';

export class UpdateUserByAdmin {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(uid: string, data: UpdateUserByAdminDto): Promise<User> {
    if (!uid) throw new Error('El UID del usuario es requerido.');
    return this.userRepository.updateUserByAdmin(uid, data);
  }
}