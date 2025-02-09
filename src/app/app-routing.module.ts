import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBooksComponent } from './components/add-edit-books/add-edit-books.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListBooksComponent } from './components/list-books/list-books.component';



const routes: Routes = [
  {path: 'Index-Books', component: ListBooksComponent},
  {path: 'CreateBook', component: AddEditBooksComponent},
  { path: 'UpdateBook/:book_id', component: AddEditBooksComponent },
  {path: 'nav', component: NavbarComponent},
  { path: '', pathMatch: 'full', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)], // forRoot() para módulo principal
  exports: [RouterModule]
})
export class AppRoutingModule { }
