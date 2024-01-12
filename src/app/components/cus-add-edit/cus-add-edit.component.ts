import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-cus-add-edit',
  templateUrl: './cus-add-edit.component.html',
  styleUrls: ['./cus-add-edit.component.css'],
})
export class CusAddEditComponent implements OnInit {
  cusForm: FormGroup;

  constructor(
    private cusService: CustomerService,
    private dialogRef: MatDialogRef<CusAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log("Data:")
    this.cusForm = this.formBuilder.group({
      id: [''],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      CreatedDate: ['', Validators.required],
      LastUpdated: ['']
    });
  }

  ngOnInit(): void {
    this.cusForm.patchValue(this.data);
  }

  onSubmit() {
    console.log("Submited");
    if (this.cusForm.valid) {
      if (this.data) {
        this.cusService
          .updateCustomer(this.data.id, this.cusForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Customer details updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the customer!");
            },
          });
      } else {
        console.log("Added");
        this.cusService.addCustomer(this.cusForm.value).subscribe({
          next: (val: any) => {
            alert('Customer added successfully!');
            this.cusForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the customer!");
          },
        });
      }
    }
  }
}
