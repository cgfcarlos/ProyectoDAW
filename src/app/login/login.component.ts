import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService , private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    switch (socialPlatform) {
      case 'facebook':
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        break;
      case  'google':
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        break;
      default:
        break;
  }

  this.socialAuthService.signIn(socialPlatformProvider)
    .then(user => {
      this.userService.login(user).subscribe(res => {
        this.router.navigate(['/']);
      });
      console.log(user);
    });
  }

}
