import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../../services/url.service';
import { AuthService } from '../../services/auth.service';
import { UrlModel, CreateUrlRequest } from '../../models/url.model';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './url-shortener.component.html',
  styleUrls: ['./url-shortener.component.css']
})
export class UrlShortenerComponent implements OnInit {
  urlForm!: FormGroup;
  isLoading = false;
  shortenedUrl: UrlModel | null = null;
  showAdvanced = false;
  copied = false;

  constructor(
    private fb: FormBuilder,
    private urlService: UrlService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.urlForm = this.fb.group({
      originalUrl: ['', [Validators.required, this.urlValidator]],
      customCode: [''],
      expiresAt: ['']
    });
  }

  urlValidator(control: any) {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (control.value && !urlPattern.test(control.value)) {
      return { invalidUrl: true };
    }
    return null;
  }

  toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
  }

  onSubmit() {
    if (this.urlForm.valid) {
      this.isLoading = true;
      this.shortenedUrl = null;

      const request: CreateUrlRequest = {
        originalUrl: this.urlForm.value.originalUrl,
        customCode: this.urlForm.value.customCode || undefined,
        expiresAt: this.urlForm.value.expiresAt ? new Date(this.urlForm.value.expiresAt) : undefined
      };

      // Add protocol if missing
      if (!request.originalUrl.startsWith('http://') && !request.originalUrl.startsWith('https://')) {
        request.originalUrl = 'https://' + request.originalUrl;
      }

      this.urlService.createShortUrl(request).subscribe({
        next: (url) => {
          this.shortenedUrl = url;
          this.urlService.addUrl(url);
          this.isLoading = false;
          this.urlForm.reset();
        },
        error: (error) => {
          console.error('Error creating short URL:', error);
          this.isLoading = false;
        }
      });
    }
  }

  copyToClipboard() {
    if (this.shortenedUrl) {
      navigator.clipboard.writeText(this.shortenedUrl.shortUrl).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
      });
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}