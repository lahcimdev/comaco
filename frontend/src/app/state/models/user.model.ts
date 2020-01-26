import { AuthenticatedUserDto } from 'src/api/models';

export interface UserModel {
    token?: string;
    authenticatedUser?: AuthenticatedUserDto;
    errorMessage?: string;
}