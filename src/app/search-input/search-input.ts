import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {output} from '@angular/core';


@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,    
    MatIconModule,
    MatButtonModule,
    
],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchInput {
  searchForm = new FormGroup({
    destiny: new FormControl('', Validators.required),
    checkIn: new FormControl(null, Validators.required),
    checkOut: new FormControl(null, Validators.required)
  });

  search = output<{ city: string; checkIn: string; checkOut: string }>();

  onSearch() {
    this.search.emit({
      city: this.searchForm.value.destiny ?? '',
      checkIn: this.searchForm.value.checkIn ?? '',
      checkOut: this.searchForm.value.checkOut ?? ''
    });
  }
}

