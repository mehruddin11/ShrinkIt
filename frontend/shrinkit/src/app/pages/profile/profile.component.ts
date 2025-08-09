import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  currentUser: User | null = null;
  isLoading = false;
  activeTab = 'profile';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.initializeForms();
      }
    });
  }

  initializeForms() {
    this.profileForm = this.fb.group({
      name: [this.currentUser?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.successMessage = '';
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      
      // Demo update - simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      }, 1000);
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      
      // Demo update - simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Password updated successfully!';
        this.passwordForm.reset();
        setTimeout(() => this.successMessage = '', 3000);
      }, 1000);
    }
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.isLoading = true;
      
      // Demo delete - simulate API call
      setTimeout(() => {
        this.authService.logout();
      }, 1000);
    }
  }
}