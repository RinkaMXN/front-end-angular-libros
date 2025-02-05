import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// alertas
import Swal from 'sweetalert2';

// interfaces
import { BookCreate } from 'src/app/interfaces/books.interface';
import { Genero, GeneroData } from 'src/app/interfaces/generos.interface';
import { Autor, AutorData } from 'src/app/interfaces/autores.interface';

// servicios
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-add-edit-books',
  templateUrl: './add-edit-books.component.html',
  styleUrls: ['./add-edit-books.component.css']
})
export class AddEditBooksComponent implements OnInit {
  // Creamos la variable del formulario
  public form!: FormGroup;
  // variable del formulario
  public book: any|undefined = undefined;
  // variable para almacenar los generos desde la consulta
  public generos: Genero[] = [];
  // variable para almacenar los autores desde la consulta
  public autores: Autor[] = [];
  // variable para definir si el formulario es para crear o actualizar
  public update_book: boolean = false;
  // variable necesaria en caso de que el formulario sea para actualizar
  public book_id!:number;
  // esta es para cargar los datos cuando el formulario es para actualizar
  public formData = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,    
    private _activatedRoute: ActivatedRoute,
    private _bookService: BookService,
  ) {
      // Se hace el formulario
      this.createForm();
   }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {      
      if( params['book_id'] != undefined ){        
        this.update_book = true;        
        this.book_id = +params['book_id'];       
        //this.getPurchase();        
      }else{
        this.formData = true;
        this.getGeneros();
        this.getAutores();
        this.createForm();
      }    
    });
  }

  getGeneros() {
    this._bookService.getGeneros().subscribe(
      (generoData: GeneroData) => {
        if (generoData.status == "success") {
          this.generos = generoData.generos;
        } else{
          this.alertaError(generoData);
        }
      },
      (error) => {
        Swal.fire('Error', 'Ocurrio un error con la conexión intentelo más tarde', 'warning');
        return;
      }
    );
  }


  getAutores() {
    this._bookService.getAutores().subscribe(
      (autorData: AutorData) => {
        if (autorData.status == "success") {
          this.autores = autorData.autores;
          //console.log('estos son los autores:', this.autores);
        } else{
          this.alertaError(autorData);
        }
      },
      (error) => {
        Swal.fire('Error', 'Ocurrio un error con la conexión intentelo más tarde', 'warning');
        return;
      }
    );
  }

  

  get titulo_libroInvalid() {
    return this.form.get('titulo_libro')!.invalid && (this.form.get('titulo_libro')!.dirty || this.form.get('titulo_libro')!.touched);
  }

  get fecha_publicacion_libroInvalid() {
    return this.form.get('fecha_publicacion_libro')!.invalid && (this.form.get('fecha_publicacion_libro')!.dirty || this.form.get('fecha_publicacion_libro')!.touched);
  }

  get descripcion_libroInvalid() {
    return this.form.get('descripcion_libro')!.invalid && (this.form.get('descripcion_libro')!.dirty || this.form.get('descripcion_libro')!.touched);
  }

  public createForm() {
    this.form = this._formBuilder.group({
      titulo_libro: [this.book != undefined ? this.book?.titulo_libro : '', [Validators.required]],
      id_autor: [this.book != undefined ? this.book?.id_autor : '', [Validators.required]],
      id_genero: [this.book != undefined ? this.book?.id_genero : '', [Validators.required]],
      fecha_publicacion_libro: [this.book != undefined ? this.book?.fecha_publicacion_libro : '', [Validators.required]],
      descripcion_libro: [this.book != undefined ? this.book?.descripcion_libro : '', [Validators.required]],
      imagen_libro: [this.book != undefined ? this.book?.imagen_libro : '', [Validators.required]],
    });
  }

  public onSubmit(){
    console.log('Datos que se enviarán al backend:', this.form.value);

    // Si la variable update_book no está se crea un nuevo libro
    if (!this.update_book) {
      // para agregar uno nuevo
      this._bookService.createBook(this.form)
        .subscribe(
          (bookCreate: BookCreate) => {
            if (bookCreate.status == "success") {
              this.alertaSuccess(bookCreate);
            } else{
              this.alertaError(bookCreate);
            }
          },
          (error) => {
            Swal.fire('Error', 'No hay conexión intentalo más tarde', 'warning');
            return;
          }
        );
    }

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
        this._router.navigateByUrl('/Index-Books');
      });
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
