import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HousingService} from '../housing.service';
import {HousingLocationInfo} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {YesNoPipe} from '../pipes/yes-no.pipe';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, YesNoPipe],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details {
route: ActivatedRoute = inject(ActivatedRoute);
   housingService = inject(HousingService);
   toastr = inject(ToastrService);
  location = inject(Location);
  housingLocation: HousingLocationInfo | undefined;
  loading = true;
  applyForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).subscribe((housingLocation) => {
      this.housingLocation = housingLocation;
      this.loading = false;
    });
  }  
  
  goBack() {
    this.location.back();
  }
  submitApplication() {
    if (this.applyForm.invalid) {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.applyForm.controls).forEach(key => {
        this.applyForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  
    
    this.toastr.success(
      'Nos pondremos en contacto pronto',
      'Datos enviados con éxito!'
    );
    
    this.applyForm.reset();
  }
}
