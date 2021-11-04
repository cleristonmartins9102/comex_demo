import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/guards/auth.guard';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
