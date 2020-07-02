import { Component, OnInit } from '@angular/core';
import {Computer} from "../../models/computer";
import {ComputerService} from "../../services/computer.service";

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {

  isLoading: boolean;
  computers: Computer[] = [];
  nbComputers: number;
  nbStockedComputers: number;

  constructor(private computerService: ComputerService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.computerService.getAll().subscribe((data: Computer[]) => {
      this.computers = data;
      this.nbComputers = this.computers.length;
      this.nbStockedComputers = this.computers.filter((computer: Computer) => computer.prixVente === 0).length;
      this.isLoading = false;
    });
  }

  deleteComputer(id: number) {
    this.isLoading = true;
    this.computerService.removeById(id).subscribe(() => {
      this.computerService.getAll().subscribe((data: Computer[]) => {
        this.computers = data;
        this.isLoading = false;
      });
    });
  }
}
