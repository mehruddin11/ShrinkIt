import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlService } from '../../services/url.service';
import { UrlAnalytics } from '../../models/url.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  analytics: UrlAnalytics | null = null;
  isLoading = true;
  selectedPeriod = '7d';

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    // Demo analytics data
    setTimeout(() => {
      this.analytics = {
        totalClicks: 1247,
        clicksByDate: [
          { date: '2024-01-01', clicks: 45 },
          { date: '2024-01-02', clicks: 67 },
          { date: '2024-01-03', clicks: 89 },
          { date: '2024-01-04', clicks: 123 },
          { date: '2024-01-05', clicks: 156 },
          { date: '2024-01-06', clicks: 134 },
          { date: '2024-01-07', clicks: 178 }
        ],
        topUrls: [
          {
            id: '1',
            originalUrl: 'https://example.com/very-long-url-1',
            shortUrl: 'https://shrink.it/abc123',
            shortCode: 'abc123',
            clicks: 456,
            createdAt: new Date('2024-01-01'),
            isActive: true
          },
          {
            id: '2',
            originalUrl: 'https://example.com/another-long-url',
            shortUrl: 'https://shrink.it/def456',
            shortCode: 'def456',
            clicks: 234,
            createdAt: new Date('2024-01-02'),
            isActive: true
          }
        ],
        recentActivity: []
      };
      this.isLoading = false;
    }, 1000);
  }

  changePeriod(period: string) {
    this.selectedPeriod = period;
    this.loadAnalytics();
  }

  getMaxClicks(): number {
    if (!this.analytics?.clicksByDate.length) return 0;
    return Math.max(...this.analytics.clicksByDate.map(d => d.clicks));
  }

  getClickPercentage(clicks: number): number {
    const max = this.getMaxClicks();
    return max > 0 ? (clicks / max) * 100 : 0;
  }
}