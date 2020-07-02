import {Component, OnInit} from '@angular/core';
import {Computer} from "../../models/computer";
import {ComputerService} from "../../services/computer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.css']
})
export class AddComputerComponent implements OnInit {

  computer = new Computer();
  marques: string[];
  types: string[];
  categories: string[];

  constructor(private computerService: ComputerService, private router: Router) { }

  ngOnInit(): void {
    this.marques = this.computerService.getAllMarques();
    this.types = this.computerService.getAllTypes();
    this.categories = this.computerService.getAllCategories();
  }

  submitComputer(): void {
    this.computer.dateEntreStock = new Date();
    this.computerService.add(this.computer).subscribe(() => {
      this.router.navigate(['/computers']);
    });
  }

  setType($event) {
    this.computer.type = $event.currentTarget.value;
  }
}
