import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CountriesComponent } from './components/countries.component';
import { GetcountryComponent } from './components/getcountry.component'
import { WineService } from './wine.service';


const ROUTES: Routes = [
  {path: '', component: CountriesComponent},
  {path: 'countries', component: CountriesComponent},
  {path: 'country/:country', component: GetcountryComponent},
  {path: '**', redirectTo: "/", pathMatch: "full"},
]
@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    GetcountryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [WineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
