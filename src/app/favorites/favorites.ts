import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../favorites.service';  
import { HousingService } from '../housing.service';  
import { HousingLocationInfo } from '../housinglocation'; 
import { HousingLocation } from '../housing-location/housing-location';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  imports: [HousingLocation, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {
favoritesService = inject(FavoritesService);
housingService = inject(HousingService);
favoriteLocations: HousingLocationInfo[] = [];

constructor() {
  combineLatest([
    this.favoritesService.favorites$,
    this.housingService.getAllHousingLocations()
  ]).pipe(
    map(([favoriteIds, allLocations]) => {
      return allLocations.filter(location => favoriteIds.includes(location.id));
    })
  ).subscribe(favorites => {
    this.favoriteLocations = favorites;
  });
}

toggleFavorite(propertyId: number) {
  this.favoritesService.toggleFavorite(propertyId);
}
}
