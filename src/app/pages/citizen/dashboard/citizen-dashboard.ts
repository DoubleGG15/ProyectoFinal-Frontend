import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citizen-dashboard.html',
  styleUrls: ['./citizen-dashboard.css']
})
export class CitizenDashboardComponent implements OnInit {
  userEmail: string | null = '';
  userId: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.userId = this.authService.getUserId();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
