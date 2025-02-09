import { Component, OnInit } from '@angular/core';
import { Book, BookData } from 'src/app/interfaces/books.interface';
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
      (bookData: BookData) => {
        if (bookData.status == "success") {
          this.books = bookData.books;
        } else{
          this.alertaError(bookData);
        }
      },
      (error) => {
        Swal.fire('Error', 'Ocurrio un error con la conexión intentelo más tarde', 'warning');
        return;
      }
    );
  }

  
  // ✅ Notificación error con validación
  public alertaError(elemento: { message: string }) {
    Swal.fire({
      icon: 'error',
      text: elemento.message,
      showConfirmButton: true,
      confirmButtonColor: '#EEB838',
      timer: 3500
    });
  }

}
