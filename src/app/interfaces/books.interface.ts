// lo uso para cuando quiero traer los datos de un libro para actualizar
// lo uso para cuando quiero traer los datos de todos los libros para el index
export interface BookData {
    status:  string;
    code:    number;
    message: string;
    books:    Book[];
}

// lo uso para cuando quiero crear un nuevo libro
export interface BookCreate {
    status:  string;
    code:    number;
    message: string;
    book?:    Book;
}

// lo uso para cuando quiero actualizar un libro
export interface BookUpdate {
    status:  string;
    code:    number;
    message: string;
    book?:    Book;
}

// son los datos generales del libro
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

