import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDescriptionComponent } from './module-description.component';
import { DataTransporterService } from '../injectables/data-transporter.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModuleDescriptionComponent', () => {
  let component: ModuleDescriptionComponent;
  let fixture: ComponentFixture<ModuleDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ModuleDescriptionComponent],
      providers: [DataTransporterService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
