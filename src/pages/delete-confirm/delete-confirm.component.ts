import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>) {}

  onConfirmClick(): void {
    this.dialogRef.close(true); // Silme işlemini onayla
  }

  onCancelClick(): void {
    this.dialogRef.close(false); // Silme işlemini iptal et
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }
}