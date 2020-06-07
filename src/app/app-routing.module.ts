import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/main/client/client.component';
import { QueriesComponent } from './components/main/queries/queries.component';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/main/login/login.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routerConfig: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'client', component: ClientComponent },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  // { path: 'queries', component: QueriesComponent },
  { path: 'queries', component: QueriesComponent, canActivate: [AuthGuard] },
  { path: 'LoginComponent', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})

/**
 * @author Jhon Alexander López Bohórquez
 */
export class AppRoutingModule {}
export const RoutingComponent = [HomeComponent, ClientComponent, QueriesComponent];
