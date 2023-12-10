import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PriceCheckPageComponent } from './price-check-page/price-check-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'price', component : PriceCheckPageComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
