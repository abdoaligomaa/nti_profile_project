import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { UpdateServiceComponent } from './update-service/update-service.component';

const routes: Routes = [
  { path: '', redirectTo:'/home',pathMatch:'full' },
  { path: 'home',component: HomeComponent},
  { path:'services', component: ServicesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path:'about',component: AboutComponent },
  { path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashBoardComponent, canActivate:[AuthGuard]},
  {path:'addprojects', component: AddProjectComponent, canActivate:[AuthGuard]},
  {path:'addservices', component: AddServiceComponent, canActivate:[AuthGuard]},
  {path:'updateProject/:id', component: UpdateProjectComponent},
  {path:'updateService/:id', component: UpdateServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
