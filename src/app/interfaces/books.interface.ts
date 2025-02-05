export interface BookData {
    status:  string;
    code:    number;
    message: string;
    books:    Book[];
}

export interface BookCreate {
    status:  string;
    code:    number;
    message: string;
    book?:    Book;
}

export interface Book{
    id_libro:                number;
    titulo_libro:            string;
    id_autor:                number;
    descripcion_libro:       string;
    id_genero:               number;
    fecha_publicacion_libro: Date;
    imagen_libro:            string;
    created_at?:             Date;
    updated_at?:             Date
}

