import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { ComputersComponent } from './components/computers/computers.component';
import { ComputerComponent } from './components/computer/computer.component';
import { AddComputerComponent } from './components/add-computer/add-computer.component';
import { EditComputerComponent } from './components/edit-computer/edit-computer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    ComputersComponent,
    ComputerComponent,
    AddComputerComponent,
    EditComputerComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
