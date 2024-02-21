import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' };
  
  errorMessage: string | null = null;


  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    this.authService.login(this.user).subscribe((response: any) => {
      alert(response.message);
      if (response.role === 'admin') {
        this.router.navigate(['/admin']); // Redirect to admin page
      } else if(response.role === 'user') {
        this.router.navigate(['/home']); 
      } else {
          this.router.navigate(['/login']); 
      } 
    });
  }
}
