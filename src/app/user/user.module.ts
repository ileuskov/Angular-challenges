import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { userRoutes } from './user.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent, LoginComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(userRoutes)],
  providers: [],
})
export class UserModule {}
