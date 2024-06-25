import {Component, inject, Input} from '@angular/core';
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {SkillService} from "../../../user/core/skill.service";
import {UserSkill} from "../../../user/interface/userSkill.interface";

@Component({
  selector: 'app-load-skill',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './load-skill.component.html',
  styleUrl: './load-skill.component.scss'
})
export class LoadSkillComponent {
  public skillService = inject(SkillService);
  public skillList$!: Observable<UserSkill[]>
  @Input() userName!: string;

  ngOnInit(){
    this.skillList$ = this.skillService.getUserSkill(this.userName);
  }
}
