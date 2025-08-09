import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UrlService } from '../../services/url.service';
import { AuthService } from '../../services/auth.service';
import { UrlModel } from '../../models/url.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urls: UrlModel[] = [];
  isLoading = true;
  selectedUrl: UrlModel | null = null;

  constructor(
    private urlService: UrlService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUrls();
    this.urlService.urls$.subscribe(urls => {
      this.urls = urls;
    });
  }

  loadUrls() {
    this.urlService.getUserUrls().subscribe({
      next: (urls) => {
        this.urls = urls;
        this.urlService.updateUrls(urls);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading URLs:', error);
        this.isLoading = false;
      }
    });
  }

  deleteUrl(url: UrlModel) {
    if (confirm('Are you sure you want to delete this URL?')) {
      this.urlService.deleteUrl(url.id!).subscribe({
        next: () => {
          this.urlService.removeUrl(url.id!);
        },
        error: (error) => {
          console.error('Error deleting URL:', error);
        }
      });
    }
  }

  copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getTotalClicks(): number {
    return this.urls.reduce((total, url) => total + url.clicks, 0);
  }

  getActiveUrls(): number {
    return this.urls.filter(url => url.isActive).length;
  }
}