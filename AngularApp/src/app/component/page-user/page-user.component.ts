import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-page-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './page-user.component.html',
  styleUrl: './page-user.component.scss'
})

export class PageUserComponent implements OnInit {
  skillNames: string[] = [];
  skillAllList: string[] = [];
  addSkillForm!: FormGroup;
  isLoading: boolean = false;
  message: string = '';

  constructor(private http: HttpClient, public authService: AuthService) {
  }

  ngOnInit(): void {

      this.initForm();


    const trigger = document.getElementById("trigger");
    const list = document.getElementById("list");
    const option1 = document.getElementById("option1") as HTMLInputElement;
    const option2 = document.getElementById("option2") as HTMLInputElement;

    if (trigger) {
      trigger.addEventListener("click", () => {
        if (list) {
          list.style.display = (list.style.display === "none") ? "block" : "none";
        }
      });
    }

    if (option1) {
      option1.addEventListener("change", () => {
        if (option1.checked) {
          console.log("Опція 1 обрана");
          // Додайте код, який потрібно виконати, коли опція 1 обрана
        } else {
          console.log("Опція 1 скасована");
          // Додайте код, який потрібно виконати, коли опція 1 скасована
        }
      });
    }

    if (option2) {
      option2.addEventListener("change", () => {
        if (option2.checked) {
          console.log("Опція 2 обрана");
          // Додайте код, який потрібно виконати, коли опція 2 обрана
        } else {
          console.log("Опція 2 скасована");
          // Додайте код, який потрібно виконати, коли опція 2 скасована
        }
      });
    }
  }



  private initForm() {
    this.addSkillForm = new FormGroup({
      skillName: new FormControl('', Validators.required),
    });
  }






  isBlockVisible: boolean = false;

  toggleBlock() {
    this.isBlockVisible = !this.isBlockVisible;
  }



}
