import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housinglocation';
import {HousingService} from '../housing.service';
import { FavoritesService } from '../favorites.service';
import { from, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchInput } from '../search-input/search-input';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, SearchInput],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);
  favoriteService = inject(FavoritesService);
  filteredLocationList: HousingLocationInfo[] = [];
  favoritesCount = 0;

  constructor() {   
    
    this.housingService
      .getAllHousingLocations()
      .subscribe((housingLocationList) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });

    
  }

  onSearchInput(search: { city: string; checkIn: string; checkOut: string }) {
    this.filterResults(search)
  }

  filterResults({ city, checkIn, checkOut }: { city: string; checkIn: string; checkOut: string }) {
  this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
  const matchesCity = housingLocation?.city.toLowerCase().includes(city.toLowerCase());
    if (!checkIn || !checkOut) {
      return matchesCity;
    }
    const checkInDate= new Date(checkIn);
    const checkOutdate= new Date(checkOut);
    const isAvailable = !housingLocation.reservations.some(res=> {
      const resFrom = new Date (res.from);
      const restTo = new Date(res.to)
      return checkInDate <= restTo && checkOutdate <= resFrom
    })

    return matchesCity && isAvailable;
  });
}

  toggleFavorite(propertyId: number) {
    this.favoriteService.toggleFavorite(propertyId);
  }
  
  isFavorite(propertyId: number): boolean {
    return this.favoriteService.isFavorite(propertyId);
  }
}
