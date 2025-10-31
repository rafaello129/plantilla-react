import { AxiosHttpClient } from '../infrastructure/http';
import { AuthRepository, UserRepository } from '../infrastructure/repositories';
import {
  LoginUser,
  RegisterUser,
  RenewToken,
  Logout,
} from '../domain/usecases/auth';
import { DeleteUserProfile, GetAllUsers, GetUserProfile, UpdateUserByAdmin, UpdateUserProfile } from '../domain/usecases/user';

// 1️⃣ Configurar URL base del API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// 2️⃣ Crear instancia del cliente HTTP
export const httpClient = new AxiosHttpClient(API_BASE_URL);

// 3️⃣ Crear instancia del repositorio de autenticación
export const authRepository = new AuthRepository(httpClient);
export const userRepository = new UserRepository(httpClient);

// 4️⃣ Crear casos de uso de autenticación
export const loginUserUseCase = new LoginUser(authRepository);
export const registerUserUseCase = new RegisterUser(authRepository);
export const renewTokenUseCase = new RenewToken(authRepository);
export const logoutUseCase = new Logout(authRepository);

// 5️⃣ Crear casos de uso de usuario
export const getAllUsersUseCase = new GetAllUsers(userRepository);
export const getUserProfileUseCase = new GetUserProfile(userRepository);
export const updateUserProfileUseCase = new UpdateUserProfile(userRepository);
export const updateUserByAdminUseCase = new UpdateUserByAdmin(userRepository);
export const deleteUserProfileUseCase = new DeleteUserProfile(userRepository);