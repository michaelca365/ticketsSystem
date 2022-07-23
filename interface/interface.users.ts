export type userTypes = {
    email: string;
    password: string;
    user_name: string;
    user_permission: number;
}

export type userTypesDB = {
    id: string;
    email: string;
    password: string;
    user_name: string;
    user_permission: number;
    estado: boolean
}

export type DecodeResult = {
    uid: string,
    usuario: string,
    email: string,
    permiso: number
}