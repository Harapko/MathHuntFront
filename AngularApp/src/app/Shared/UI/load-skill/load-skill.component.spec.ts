import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSkillComponent } from './load-skill.component';

describe('LoadSillComponent', () => {
  let component: LoadSkillComponent;
  let fixture: ComponentFixture<LoadSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadSkillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
