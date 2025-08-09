import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UrlShortenerComponent } from '../../components/url-shortener/url-shortener.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, UrlShortenerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home {
}