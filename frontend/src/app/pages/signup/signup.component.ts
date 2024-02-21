import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = { username: '', email: '', password: '', role: 'user' };

  constructor(private authService: AuthService) {}

  signup() {
    this.authService.signup(this.user).subscribe((response: any) => {
      alert(response.message);
    });
  }
}
