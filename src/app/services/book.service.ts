import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Book, BookData, BookCreate, BookUpdate } from '../interfaces/books.interface';
import { Genero, GeneroData } from '../interfaces/generos.interface';
import { AutorData } from '../interfaces/autores.interface';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  // URL base de la API
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private _http: HttpClient) { }
  
  // Obtener todos los libros
  public getBooks(): Observable<BookData> {
    return this._http.get<BookData>(`${this.apiUrl}index`);
  }

  // Obtener todos los generos para el select
  public getGeneros(): Observable<GeneroData> {
    return this._http.get<GeneroData>(`${this.apiUrl}getGenerosAll`);
  }

  // Obtener todos los autores para el select
  public getAutores(): Observable<AutorData> {
    return this._http.get<AutorData>(`${this.apiUrl}getAutoresAll`);
  }

  // crear un nuevo libro
  public createBook(form: FormGroup): Observable<BookCreate>{
    const formData = new FormData();

    formData.append('titulo_libro', form.get('titulo_libro')?.value);
    formData.append('id_autor', form.get('id_autor')?.value);
    formData.append('id_genero', form.get('id_genero')?.value);
    formData.append('fecha_publicacion_libro', form.get('fecha_publicacion_libro')?.value);
    formData.append('descripcion_libro', form.get('descripcion_libro')?.value);

    // Capturar el archivo de imagen correctamente
    const fileInput = form.get('imagen_libro')?.value;
    if (fileInput instanceof File) {
        formData.append('imagen_libro', fileInput);
    }

    console.log('Datos que se enviarán al backend:', formData);

    return this._http.post<BookCreate>(
      `${this.apiUrl}createbook`, formData
    );
  }

  // obtener los datos de un libro 
  public getBookById( book_id:number ): Observable<BookData>{
    return this._http.get<BookData>(`${ this.apiUrl }getBookById/${ book_id }`);
  }

  // actualizar un nuevo libro
  public updateBook(form: FormGroup, book_id:number): Observable<BookUpdate>{
    const formData = new FormData();

    formData.append('titulo_libro', form.get('titulo_libro')?.value);
    formData.append('id_autor', form.get('id_autor')?.value);
    formData.append('id_genero', form.get('id_genero')?.value);
    formData.append('fecha_publicacion_libro', form.get('fecha_publicacion_libro')?.value);
    formData.append('descripcion_libro', form.get('descripcion_libro')?.value);

    // Capturar el archivo de imagen correctamente
    const fileInput = form.get('imagen_libro')?.value;
    if (fileInput instanceof File) {
        formData.append('imagen_libro', fileInput);
    }
    console.log('Datos que se enviarán al backend:', formData);

    return this._http.post<BookUpdate>(
      `${this.apiUrl}updatebook/${book_id}`, formData
    );
  }
  
}


