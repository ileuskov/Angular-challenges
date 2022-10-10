import { TOASTR_TOKEN, Toastr } from './../common/toastr.service';
import { AuthService } from './auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error ::-ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  constructor(
    //type and @Inject are handled by Angular
    public AuthService: AuthService,
    //@Inject handled manually and type is provided by me as well
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private route: Router
  ) {}

  ngOnInit(): void {
    //Auth Service allows us to prepopulate the forms. If not necessary, let firstName: FormControl = new FormControl() would be enough
    this.firstName = new FormControl(this.AuthService.currentUser.firstName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'), //multiple validators are allowed
    ]);
    this.lastName = new FormControl(
      this.AuthService.currentUser.lastName,
      Validators.required
    );
    // this is what formControlName need to match with
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  cancel() {
    this.route.navigate(['events']);
  }
  saveProfile(profileFormValues: any) {
    // only save if the form is valid
    if (this.profileForm.valid) {
      this.AuthService.updateCurrentUser(
        profileFormValues.firstName,
        profileFormValues.lastName
      ).subscribe(() => {
        //by subscribing to the http observable,
        //the toast message will only show up once the user is updated on the server
        this.toastr.success('Profile Saved');
      });
      // this.route.navigate(['events']);
    }
  }

  logout() {
    this.AuthService.logout().subscribe(() => {
      this.route.navigate(['/user/login']);
    });
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }
}

// Another example of reactive Forms without prepopulating

// export class CreateEventComponent implements OnInit {
//   newEventForm: FormGroup
//   location: FormGroup

//   name: FormControl = new FormControl()
//   date: FormControl = new FormControl()
//   time: FormControl = new FormControl()
//   address: FormControl = new FormControl()
//   city: FormControl = new FormControl()
//   country: FormControl = new FormControl()

//   constructor(private eventService:EventService, private router:Router) {

//   }

//    ngOnInit(): void {
//      this.location = new FormGroup({
//       address: this.address,
//       city: this.city,
//       country: this.country
//      })

//      this.newEventForm = new FormGroup({
//       name: this.name,
//       date: this.date,
//       time: this.time,
//       location: this.location
//      })
//    }

//   saveNewEvent(eventFormValue: any){
//    this.eventService.saveEvent(eventFormValue);
//    this.router.navigate(['events']);
//   }

//   cancel() {
//     this.router.navigate(['/events'])
//   }
