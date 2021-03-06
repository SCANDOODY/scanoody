import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbThemeModule, NbLayoutModule, NbButtonModule, NbSidebarModule,
  NbDatepickerModule, NbCardModule, NbIconModule,
  NbActionsModule, NbMenuModule, NbDialogModule, NbSelectModule,
  NbInputModule
} from '@nebular/theme';

import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './module/add-item/add-item.component';
import { ViewItemComponent } from './module/view-item/view-item.component';
import { ModulesComponent } from './modules/modules.component';
import { ModuleDescriptionComponent } from './module-description/module-description.component';
import { CommonModule } from '@angular/common';
import { VarietyPipe } from './pipes/variety.pipe';
import { QantityPipe } from './pipes/qantity.pipe';
import { UpdateItemComponent } from './module/update-item/update-item.component';
import { FilterItemComponent } from './module/filter-item/filter-item.component';
import { ViewRecipeComponent } from './recipe/view-recipe/view-recipe.component';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { RecipeComponent } from './recipe/recipe/recipe.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ImageUrlPipe } from './pipes/image-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AddItemComponent,
    ViewItemComponent,
    ModulesComponent,
    ModuleDescriptionComponent,
    VarietyPipe,
    QantityPipe,
    ImageUrlPipe,
    UpdateItemComponent,
    FilterItemComponent,
    RecipeComponent, AddRecipeComponent, ViewRecipeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbSelectModule,
    NbInputModule,
    RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
