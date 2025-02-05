export interface GeneroData {
    code:    number;
    status:  string;
    message: string;
    generos: Genero[];
}

export interface Genero {
    id_genero:           number;
    nombre_genero:       string;
    created_at?:          Date;
    updated_at?:          Date;
}