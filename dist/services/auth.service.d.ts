import { UserEntity } from "./../entities";
import { CreateUserRequestType } from "./../types";
export declare const createUser: ({ name, hashedPassword, role, }: CreateUserRequestType) => Promise<UserEntity | null>;
export declare const getUser: (name: any) => Promise<UserEntity | null>;
