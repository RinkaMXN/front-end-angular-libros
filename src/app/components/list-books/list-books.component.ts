import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/books.interface';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private _bookService: BookService,) {}

  ngOnInit(): void {
    this.getListBooks();
  }

  getListBooks() {
    this._bookService.getBooks().subscribe(
      (bookData) => {
        this.books = bookData.books;
      },
      (error) => {
        // imprimimos de error
        console.error("Error al obtener libros:", error.message);
        // imprimimos el error que manda el back
        this.alertaError({ errors: [error.error.message] });
      }
    );
  }

  // ✅ Notificación success
  public alertaSuccess(elemento: { message: string }) {
    Swal.fire({
      icon: 'success',
      text: elemento.message,
      showConfirmButton: true,
      confirmButtonColor: '#EEB838',
      timer: 3500
    }).then(() => {
     // this._router.navigateByUrl('/admin/pmanager/purchases');
    });
  }

  // ✅ Notificación error con validación
  public alertaError(elemento: { errors?: string[] }) {
    const errorMsg = elemento.errors?.[0] || "Ha ocurrido un error inesperado.";
    Swal.fire({
      icon: 'error',
      title: 'Ooopppps!',
      text: errorMsg,
      showConfirmButton: true,
      confirmButtonColor: '#EEB838',
      timer: 3500
    });
  }
}
