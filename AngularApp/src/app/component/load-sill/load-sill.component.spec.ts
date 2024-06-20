import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSillComponent } from './load-sill.component';

describe('LoadSillComponent', () => {
  let component: LoadSillComponent;
  let fixture: ComponentFixture<LoadSillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadSillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadSillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
