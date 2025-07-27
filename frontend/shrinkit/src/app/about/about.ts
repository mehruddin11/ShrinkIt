// about.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user-service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements OnInit, AfterViewInit {
  form!: FormGroup;
  showPassword = false;
  
  @ViewChild('loginContainer') loginContainer!: ElementRef;
  @ViewChild('loginForm') loginForm!: ElementRef;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initAnimations() {
    // Background animation
    gsap.from(this.loginContainer.nativeElement, {
      duration: 1,
      backgroundColor: '#ffffff00',
      ease: 'power2.inOut'
    });

    // Form entrance animation
    gsap.from(this.loginForm.nativeElement, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'back.out(1.7)'
    });

    // Floating shapes animation
    const shapes = this.loginContainer.nativeElement.querySelectorAll('.shape');
    shapes.forEach((shape: HTMLElement, i: number) => {
      const duration = 3 + Math.random() * 2;
      const delay = i * 0.3;
      
      gsap.to(shape, {
        duration,
        delay,
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = this.showPassword ? 'text' : 'password';
  }

  handleSubmit() {
    if (this.form.valid) {
     
      // Add submission animation
      gsap.to('.submit-btn', {
        duration: 0.3,
        scale: 0.95,
        y: 2,
        repeat: 1,
        yoyo: true,
        ease: 'power2.inOut',
        onComplete: () => {
          const { email, password } = this.form.value;
          console.log("Submitting:", { email, password });
          
          // this.userService.login({ email, password }).subscribe({
          //   next: (res) => console.log('Login Success:', res),
          //   error: (err) => {
          //     console.error('Login Failed:', err);
          //     this.shakeForm();
          //   }
          // });
        }
      });
    } else {
      this.shakeForm();
      console.log('Invalid form');
    }
  }

  private shakeForm() {
    gsap.to(this.loginForm.nativeElement, {
      duration: 0.3,
      keyframes: {
        x: [-5, 5, -5, 5, 0],
      },
      ease: 'power1.inOut'
    });
  }
}