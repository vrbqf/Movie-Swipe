import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; // Import funkce pro ikony
import { playSharp, bookmark, heart } from 'ionicons/icons'; // Import konkrétních ikon

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  constructor() {
    // Tady ty ikony "odemkneš" pro HTML
    addIcons({ playSharp, bookmark, heart });
  }
}
