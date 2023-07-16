import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { isAuthenticated } from './shared/utils';
import { AnalyticsComponent } from './components/analytics/analytics.component';

const routes: Routes = [
    { path: '', redirectTo: 'test', pathMatch: 'full' },
    { path: 'test', component: TestComponent, canActivate: [isAuthenticated] },
    { path: 'login', component: LoginComponent },
    { path: 'analytics', component: AnalyticsComponent, canActivate: [isAuthenticated] },
    { path: '**', redirectTo: 'test', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
