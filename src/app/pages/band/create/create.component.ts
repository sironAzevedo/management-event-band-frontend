import { ToastService } from './../../../services/toast.service';
import { LoaderService } from './../../../services/loader.service';
import { BandService } from 'src/app/services/band.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Band } from 'src/app/interfaces/band';

export interface Data {
  chave?: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateBandComponent implements OnInit {

  formGroup: FormGroup;
  addCan = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateBandComponent>,
    private bandService: BandService,
    private ionLoader: LoaderService,
    private toasService: ToastService,
  ) {}

  ngOnInit() {
    this.validFields();
  }

  validFields() {
    this.formGroup = this.fb.group({     
      nameBand: ['', Validators.required] 
    });
  }

  create() {
    this.addCan= true;
    const values = this.formGroup.value;

    const band: Band = {
      name: values.nameBand,
      chavePj: this.data.chave
    }

    this.ionLoader.showLoader();
    this.bandService.create(band)     
    .subscribe(() => {
      this.ionLoader.hideLoader()
      this.dialogRef.close();
      let msg = 'Banda criada com sucesso';
      this.toasService.showToast(msg, 2000, 'success').then(() => {               
        this.bandService.filterBool(true);
      });
    }),
    error => { }
  }
}
