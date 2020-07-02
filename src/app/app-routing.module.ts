import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComputersComponent} from "./components/computers/computers.component";
import {AddComputerComponent} from "./components/add-computer/add-computer.component";
import {ComputerComponent} from "./components/computer/computer.component";
import {EditComputerComponent} from "./components/edit-computer/edit-computer.component";


const routes: Routes = [
  {path: '', redirectTo: 'computers', pathMatch: 'full'},
  {path: 'computers', component: ComputersComponent},
  {path: 'computers/add', component: AddComputerComponent},
  {path: 'computers/:id', component: ComputerComponent},
  {path: 'computers/edit/:id', component: EditComputerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
