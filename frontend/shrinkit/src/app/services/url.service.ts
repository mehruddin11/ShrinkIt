import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../../enviroment/environment';
import { UrlModel, CreateUrlRequest, UrlAnalytics } from '../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private urlsSubject = new BehaviorSubject<UrlModel[]>([]);
  public urls$ = this.urlsSubject.asObservable();

  constructor() {}

  // Demo method to create short URL
  createShortUrl(request: CreateUrlRequest): Observable<UrlModel> {
    const shortCode = request.customCode || this.generateShortCode();
    const shortUrl: UrlModel = {
      id: Math.random().toString(36).substr(2, 9),
      originalUrl: request.originalUrl,
      shortUrl: `https://shrink.it/${shortCode}`,
      shortCode,
      clicks: 0,
      createdAt: new Date(),
      expiresAt: request.expiresAt,
      isActive: true
    };
    
    return of(shortUrl);
  }

  // Demo method to get user URLs
  getUserUrls(): Observable<UrlModel[]> {
    const demoUrls: UrlModel[] = [
      {
        id: '1',
        originalUrl: 'https://example.com/very-long-url-that-needs-shortening',
        shortUrl: 'https://shrink.it/abc123',
        shortCode: 'abc123',
        clicks: 45,
        createdAt: new Date('2024-01-01'),
        isActive: true
      },
      {
        id: '2',
        originalUrl: 'https://another-example.com/another-very-long-url',
        shortUrl: 'https://shrink.it/def456',
        shortCode: 'def456',
        clicks: 23,
        createdAt: new Date('2024-01-02'),
        isActive: true
      }
    ];
    
    return of(demoUrls);
  }

  getUrlById(id: string): Observable<UrlModel> {
    // Demo implementation
    return of({
      id,
      originalUrl: 'https://example.com/demo-url',
      shortUrl: `https://shrink.it/${id}`,
      shortCode: id,
      clicks: Math.floor(Math.random() * 100),
      createdAt: new Date(),
      isActive: true
    });
  }

  deleteUrl(id: string): Observable<void> {
    // Demo implementation
    return of(void 0);
  }

  getAnalytics(): Observable<UrlAnalytics> {
    // Demo analytics data
    const analytics: UrlAnalytics = {
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
      topUrls: [],
      recentActivity: []
    };
    
    return of(analytics);
  }

  updateUrls(urls: UrlModel[]): void {
    this.urlsSubject.next(urls);
  }

  addUrl(url: UrlModel): void {
    const currentUrls = this.urlsSubject.value;
    this.urlsSubject.next([url, ...currentUrls]);
  }

  removeUrl(id: string): void {
    const currentUrls = this.urlsSubject.value;
    this.urlsSubject.next(currentUrls.filter(url => url.id !== id));
  }

  private generateShortCode(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}