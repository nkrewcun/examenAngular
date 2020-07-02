import { Component, OnInit } from '@angular/core';
import {Computer} from "../../models/computer";
import {ComputerService} from "../../services/computer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css']
})
export class EditComputerComponent implements OnInit {

  computer = new Computer();
  marques: string[];
  types: string[];
  categories: string[];
  isLoading: boolean;

  constructor(private computerService: ComputerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.marques = this.computerService.getAllMarques();
    this.types = this.computerService.getAllTypes();
    this.categories = this.computerService.getAllCategories();
    this.computerService.getById(id).subscribe((data: Computer) => {
      this.computer = data;
      document.querySelectorAll('#type option').forEach(option => {
        if(option.getAttribute('value') === this.computer.type) {
          option.setAttribute('selected', 'true');
        }
      });
      this.isLoading = false;
    });
  }

  editComputer(): void {
    this.computerService.edit(this.computer).subscribe(() => {
      this.router.navigate(['/computers']);
    });
  }

  setType($event) {
    this.computer.type = $event.currentTarget.value;
  }
}
