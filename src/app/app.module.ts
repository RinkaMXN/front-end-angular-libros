import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { AddEditBooksComponent } from './components/add-edit-books/add-edit-books.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListBooksComponent,
    AddEditBooksComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule, // ✅ Agregar aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
