import { Component, input, output, computed, signal } from '@angular/core';
import { HousingLocationInfo } from '../housinglocation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation().photo" 
      alt="Exterior photo of {{housingLocation().name}}">
      
      <button class="favorite-btn" (click)="toggleFavorite()" [class.is-favorite]="isFavorite()">
        @if (isFavorite()) {
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="heart-icon">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heart-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        }
        <span class="favorite-tooltip">
          @if (isFavorite()) {
            Quitar de favoritos
          } @else {
            Agregar a favoritos
          }
        </span>
      </button>
      
      <h2 class="listing-heading">{{ housingLocation().name }}</h2>
      
      <p class="listing-location">{{ housingLocation().city }}, {{ housingLocation().state }}</p>
      

      
      <!-- 🎨 COMPUTED SIGNAL - Features principales -->
      @if (mainFeatures().length > 0) {
        <div class="features-badges">
          @for (feature of mainFeatures(); track feature) {
            <span class="feature-badge">{{ feature }}</span>
          }
        </div>
      }
      
      <a [routerLink]="['/details', housingLocation().id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./housing-location.css']
})
export class HousingLocation {
  // 📥 INPUT SIGNALS 
  housingLocation = input.required<HousingLocationInfo>();
  isFavorite = input<boolean>(false);
  
  // 📤 OUTPUT SIGNALS 
  favoriteToggled = output<number>();

  // 🎨 Badge de características principales
  mainFeatures = computed(() => {
    const features = [];
    if (this.housingLocation().wifi) features.push('📶 WiFi');
    if (this.housingLocation().laundry) features.push('🧺 Lavandería');
    return features.slice(0, 2); 
  });

  toggleFavorite() {
    this.favoriteToggled.emit(this.housingLocation().id);
  }
}
