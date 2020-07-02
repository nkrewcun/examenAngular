import { Component, OnInit } from '@angular/core';
import {Computer} from "../../models/computer";
import {ComputerService} from "../../services/computer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {

  isLoading: boolean;
  computer: Computer;
  id: number;

  constructor(private computerService: ComputerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = +this.route.snapshot.paramMap.get('id');
    this.computerService.getById(this.id).subscribe((data: Computer) => {
      this.computer = data;
      this.isLoading = false;
    });
  }
  deleteComputer(id: number) {
    this.computerService.removeById(id).subscribe(() => {
        this.router.navigate(['/computers']);
      });
  }
}
