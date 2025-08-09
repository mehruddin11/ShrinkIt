export interface UrlModel {
  id?: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
  expiresAt?: Date;
  userId?: string;
  isActive: boolean;
}

export interface CreateUrlRequest {
  originalUrl: string;
  customCode?: string;
  expiresAt?: Date;
}

export interface UrlAnalytics {
  totalClicks: number;
  clicksByDate: { date: string; clicks: number }[];
  topUrls: UrlModel[];
  recentActivity: UrlModel[];
}