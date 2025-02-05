export interface AutorData {
    code:    number;
    status:  string;
    message: string;
    autores: Autor[];
}

export interface Autor {
    id_autor:         number;
    nombre_autor:       string;
    created_at?:          Date;
    updated_at?:          Date;
}