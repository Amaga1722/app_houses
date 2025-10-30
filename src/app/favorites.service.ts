import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() {
    const saved = localStorage.getItem('housing-favorites');
    if(saved){
      const favorites = JSON.parse(saved);
      this.favoritesSubject.next(favorites);
    }
  }
private favoritesSubject = new BehaviorSubject<number[]>([]);
public favorites$ = this.favoritesSubject.asObservable();

getFavorites(): number[] {
  return this.favoritesSubject.value;
}
isFavorite(id: number): boolean {
  return this.favoritesSubject.value.includes(id);
}
toggleFavorite(id: number): void {
  const currentFavorites = this.favoritesSubject.value; // [1, 5, 8]
  let newFavorites: number[];
  
  if (currentFavorites.includes(id)) {
    
    newFavorites = currentFavorites.filter(fav => fav !== id);
  } else {
    
    newFavorites = [...currentFavorites, id];
  }
  this.favoritesSubject.next(newFavorites);
  localStorage.setItem('housing-favorites', JSON.stringify(newFavorites));
  
}
}
