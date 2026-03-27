import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  /*IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonList,*/
  IonSegment,
  IonSegmentButton,
  IonLabel, IonGrid, IonRow, IonCol, IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    /*IonCard,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonList,*/
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon
  ],
})
export class Tab2Page {
  allSavedItems: any[] = [];
  viewType: 'movie' | 'tv' = 'movie'; // Výchozí nastavení

  ionViewWillEnter() {
    this.loadWant();
  }

  loadWant() {
    const stored = localStorage.getItem('want');
    this.allSavedItems = stored ? JSON.parse(stored) : [];
  }

  // Funkce, která zachytí změnu v přepínači
  segmentChanged(event: any) {
    this.viewType = event.detail.value;
  }

  // Pomocná funkce pro zobrazení jen správných dat
  getFilteredMovies() {
    return this.allSavedItems.filter(item => item.typ === this.viewType);
  }

  removeFromWant(id: number) {
    this.allSavedItems = this.allSavedItems.filter(m => m.id !== id);
    localStorage.setItem('want', JSON.stringify(this.allSavedItems));
  }
}
