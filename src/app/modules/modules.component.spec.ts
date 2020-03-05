import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesComponent } from './modules.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTransporterService } from '../injectables/data-transporter.service';
import { NbMenuService } from '@nebular/theme';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from '../pipes/qantity.pipe.spec';
import { AngularFireAuth } from '@angular/fire/auth';
import { mockAngularFireAuth } from '../auth/auth.service.spec';
import { AuthService } from '../auth/auth.service';

describe('ModulesComponent', () => {
  let component: ModulesComponent;
  let fixture: ComponentFixture<ModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ModulesComponent],
      providers: [{ provide: AngularFirestore, useValue: FirestoreStub },
      { provide: AngularFireAuth, useValue: mockAngularFireAuth }, AuthService,
        NbMenuService, DataTransporterService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
