import {Component, inject, Input} from '@angular/core';
import {SkillService} from "../../data/services/skill.service";
import {Observable} from "rxjs";
import {UserSkill} from "../../data/interfaces/Skill";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-load-sill',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './load-sill.component.html',
  styleUrl: './load-sill.component.scss'
})
export class LoadSillComponent {
  public skillService = inject(SkillService);
  public skillList$!: Observable<UserSkill[]>
  @Input() userName!: string;

  ngOnInit(){
    this.skillList$ = this.skillService.getUserSkill(this.userName);
  }
}
