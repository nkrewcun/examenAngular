import { Component, OnInit } from '@angular/core';
import {Computer} from "../../models/computer";

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.css']
})
export class AddComputerComponent implements OnInit {

  computer = new Computer();

  constructor() { }

  ngOnInit(): void {
  }

}
