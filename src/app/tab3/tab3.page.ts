import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonSegment,       // Přidáno
  IonSegmentButton, // Přidáno
  IonLabel, IonGrid, IonRow, IonCol, IonIcon          // Přidáno
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    /* IonCard,
     IonCardHeader,
     IonCardTitle,
     IonCardContent,
     IonButton,*/
    IonSegment,       // Přidáno
    IonSegmentButton, // Přidáno
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    // Přidáno
  ],
})
export class Tab3Page {

  allFavorites: any[] = []; // Tady jsou všechny uložené věci
  viewType: 'movie' | 'tv' = 'movie'; // Výchozí zobrazení
  imageUrl = "https://image.tmdb.org/t/p/w500";

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.allFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  // Funkce pro přepínání bez ngModel
  segmentChanged(event: any) {
    this.viewType = event.detail.value;
  }

  // Funkce pro filtrování, kterou použiješ v @for
  get filteredFavorites() {
    return this.allFavorites.filter(item => item.typ === this.viewType);
  }

  removeFavorite(movie: any) {
    this.allFavorites = this.allFavorites.filter(f => f.id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(this.allFavorites));
  }
}
