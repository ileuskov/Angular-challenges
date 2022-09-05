import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { userRoutes } from './user.routes';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
  providers: [],
})
export class UserModule {}
