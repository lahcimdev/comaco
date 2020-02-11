import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCroppedEvent, CropperPosition } from 'ngx-image-cropper';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css']
})
export class UserPhotoComponent implements OnInit {

  image: any;
  croppedImage: any = '';

  constructor(
    public dialogReference: MatDialogRef<UserPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogReference.close();
  }

  ngOnInit() { 
    this.image = this.data;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  loadImageFailed() {
    this.dialogReference.close();
  }

}

