import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonContent,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonToggle,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonContent,
    IonItem,
    IonGrid,
    IonRow,
    // IonCol,
    //IonCard,
    // IonToggle,
    //IonCardHeader,
    // IonCardTitle,
    // IonCardContent,
    IonButton,
    // IonButtons,
    //IonSegment,
    // IonSegmentButton,
    // IonInput
  ],
})
export class Tab1Page {

  private http = inject(HttpClient);


  movies: any[] = [];
  selectedMovie: any = null;
  imageUrl = "https://image.tmdb.org/t/p/w500";
  apiKey = "ef32b67b7ef29916aa9f7b2cf99f3ea1"; // sem dej svůj TMDB API key


  searchQuery: string = '';
  searchType: 'movie' | 'tv' = 'movie';

  favorites: any[] = [];

  protected darkMode: boolean= false;

  constructor() {
    // načtení uložených favorites při startu
    const stored = localStorage.getItem('favorites');
    this.favorites = stored ? JSON.parse(stored) : [];
  }

  ionViewWillEnter() {
    this.loadPopular();
  }


  loadPopular() {
    const url = `https://api.themoviedb.org/3/${this.searchType}/popular?api_key=${this.apiKey}`;
    this.http.get(url).subscribe((data: any) => {
      this.movies = data.results || [];
    });
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if (this.darkMode) {
      localStorage.setItem('darkModeActivated', 'true');
    } else {
      localStorage.setItem('darkModeActivated', 'false');
    }
  }

  // Vyhledávání
  searchItems() {
    if (!this.searchQuery) {
      this.loadPopular();
      return;
    }
    const url = `https://api.themoviedb.org/3/search/${this.searchType}?api_key=${this.apiKey}&query=${encodeURIComponent(this.searchQuery)}`;
    this.http.get(url).subscribe((data: any) => {
      this.movies = data.results || [];
    });
  }

  // Modal detail
  openMovie(movie: any) {
    this.selectedMovie = movie;
  }

  closeMovie() {
    this.selectedMovie = null;
  }

  // Favorites – přidání / odebrání
  toggleFavorite(movie: any) {
    const index = this.favorites.findIndex(f => f.id === movie.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  // Zjistí, zda je ve favorites
  isFavorite(movie: any): boolean {
    return this.favorites.some(f => f.id === movie.id);
  }

  // Přepnutí mezi filmy a seriály
  changeType(type: 'movie' | 'tv') {
    this.searchType = type;
    this.searchQuery = '';
    this.loadPopular();
  }

  // pro sledování rozbalených popisů
  expandedDescriptions: Set<number> = new Set();

  toggleDescription(movie: any) {
    if (this.expandedDescriptions.has(movie.id)) {
      this.expandedDescriptions.delete(movie.id);
    } else {
      this.expandedDescriptions.add(movie.id);
    }
  }

  isDescriptionExpanded(movie: any): boolean {
    return this.expandedDescriptions.has(movie.id);
  }
}
