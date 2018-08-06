import { ProfileComponent } from './profile/profile.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditEmailModalComponent } from './profile/edit-email-modal/edit-email-modal.component';
import { EditPasswordModalComponent } from './profile/edit-password-modal/edit-password-modal.component';
import { DeleteProfileModalComponent } from './profile/delete-profile-modal/delete-profile-modal.component';

export const components: any[] = [
  ProfileComponent,
  ProfilePageComponent,
  EditEmailModalComponent,
  EditPasswordModalComponent,
  DeleteProfileModalComponent
];

export * from './profile/profile.component';
export * from './profile-page/profile-page.component';
export * from './profile/edit-email-modal/edit-email-modal.component';
export * from './profile/edit-password-modal/edit-password-modal.component';
export * from './profile/delete-profile-modal/delete-profile-modal.component';
