import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { CategoryService } from './category.service';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(
    private socialAuthService: SocialAuthService,
    private categoryService: CategoryService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
      if (localStorage.getItem('token')) {
        this.user$ =  userService.getById(localStorage.getItem('token'));
      }
  }

  login(socialPlatform: string) {
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
        localStorage.setItem('token', res.user.id);
        this.router.navigate(['/']);
      });
      console.log(user);
    });
  }

  logout() {
    // this.socialAuthService.signOut().then(
    //   () => localStorage.removeItem('token')
    // );
  }

  get appUser$(): Observable<User> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this.userService.getById(user.id);
        }
        return  Observable.of(null);
      });
  }

}
