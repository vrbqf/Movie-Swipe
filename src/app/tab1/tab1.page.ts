import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  IonButton, IonContent, IonHeader, IonToolbar,
  IonIcon, IonSegment, IonSegmentButton, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, bookmark, bookmarkOutline, playCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    IonContent,
    IonButton,
    IonHeader,
    IonToolbar,
    //IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel
  ]
})
export class Tab1Page implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  movies: any[] = [];
  imageUrl = "https://image.tmdb.org/t/p/w500";
  apiKey = "ef32b67b7ef29916aa9f7b2cf99f3ea1";

  searchType: 'movie' | 'tv' = 'movie';
  favorites: any[] = [];
  wantList: any[] = [];

  // VEPSÁNO: Sledování rozbalených popisků
  expandedDescriptions: Set<number> = new Set();

  showTrailer = false;
  currentTrailerUrl: SafeResourceUrl | null = null;

  constructor() {
    addIcons({ heart, heartOutline, bookmark, bookmarkOutline, playCircle });
    this.loadStorage();
  }

  ngOnInit() {
    this.loadPopular();
  }

  loadStorage() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.wantList = JSON.parse(localStorage.getItem('want') || '[]');
  }

  loadPopular() {
    const url = `https://api.themoviedb.org/3/${this.searchType}/popular?api_key=${this.apiKey}&language=cs-CZ`;
    this.http.get(url).subscribe((data: any) => {
      this.movies = data.results || [];
      // Tip: Při změně kategorie (film/seriál) vymažeme rozbalené popisky
      this.expandedDescriptions.clear();
    });
  }

  segmentChanged(event: any) {
    this.searchType = event.detail.value;
    this.loadPopular();
  }

  // VEPSÁNO: Funkce pro rozbalení/zabalení popisu (bez traileru)
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

  openTrailer(movie: any) {
    const url = `https://api.themoviedb.org/3/${this.searchType}/${movie.id}/videos?api_key=${this.apiKey}`;
    this.http.get(url).subscribe((data: any) => {
      const trailer = data.results.find((v: any) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
      if (trailer) {
        this.currentTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
        this.showTrailer = true;
      } else {
        alert("Trailer není k dispozici.");
      }
    });
  }

  closeTrailer() {
    this.showTrailer = false;
    this.currentTrailerUrl = null;
  }

  toggleFavorite(movie: any) {
    const index = this.favorites.findIndex(f => f.id === movie.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push({
        id: movie.id,
        nazev: movie.title || movie.name,
        obrazek: this.imageUrl + movie.poster_path,
        typ: this.searchType
      });
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  toggleWant(movie: any) {
    const index = this.wantList.findIndex(m => m.id === movie.id);
    if (index > -1) {
      this.wantList.splice(index, 1);
    } else {
      this.wantList.push({
        id: movie.id,
        nazev: movie.title || movie.name,
        obrazek: this.imageUrl + movie.poster_path,
        typ: this.searchType
      });
    }
    localStorage.setItem('want', JSON.stringify(this.wantList));
  }

  isFavorite(id: number) { return this.favorites.some(f => f.id === id); }
  isWant(id: number) { return this.wantList.some(m => m.id === id); }
}
