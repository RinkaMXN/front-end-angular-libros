import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Book, BookData, BookCreate } from '../interfaces/books.interface';
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
    const book = {
      titulo_libro: form.get('titulo_libro')?.value,
      id_autor: form.get('id_autor')?.value,
      id_genero: form.get('id_genero')?.value,
      fecha_publicacion_libro: form.get('fecha_publicacion_libro')?.value,
      descripcion_libro: form.get('descripcion_libro')?.value,
      imagen_libro: form.get('imagen_libro')?.value,
    };

    return this._http.post<BookCreate>(
      `${this.apiUrl}createbook`, book
    );

  }
}


