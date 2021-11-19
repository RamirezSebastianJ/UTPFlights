import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootHomeComponent } from './root-home/root-home.component';
import { RootComponent } from './root.component';

const routes: Routes = [
  {
    path: '', component: RootComponent
  },
  {
    path: 'home', component: RootHomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
