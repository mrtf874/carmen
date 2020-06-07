import { Component, OnInit } from '@angular/core';
import { ClientsResponse } from 'src/app/models/clients.model';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'ceg-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.css']
})
export class ModalViewComponent implements OnInit {

  client: ClientsResponse;
  imgBefore: string;
  imgAfter: string;
  picture: string;

  constructor(private constant: ConstantsService) {
    this.imgBefore = '';
    this.imgAfter = '';
    this.picture = '';
  }

  ngOnInit() {
    this.viewPicture(this.client.picture);
  }

  private viewPicture(picture: string) {
    if (picture !== undefined && picture !== '') {
      if (picture.includes(this.constant.IMAGE_BASE_JPEG) ||
        picture.includes(this.constant.IMAGE_BASE_JPG) ||
        picture.includes(this.constant.IMAGE_BASE_PNG)) {
        this.picture = picture;
      } else {
        this.picture = this.constant.IMAGE_BASE_JPEG + picture;
      }
    }
  }

  public viewDetail(pictureBefore: string, pictureAfter: string): void {
    if (pictureBefore !== undefined && pictureBefore !== '') {
      if (pictureBefore.includes(this.constant.IMAGE_BASE_JPEG) ||
        pictureBefore.includes(this.constant.IMAGE_BASE_JPG) ||
        pictureBefore.includes(this.constant.IMAGE_BASE_PNG)) {
        this.imgBefore = pictureBefore;
      } else {
        this.imgBefore = this.constant.IMAGE_BASE_JPEG + pictureBefore;
      }
    }
    if (pictureAfter !== undefined && pictureAfter !== '') {
      if (pictureAfter.includes(this.constant.IMAGE_BASE_JPEG) ||
        pictureAfter.includes(this.constant.IMAGE_BASE_JPG) ||
        pictureAfter.includes(this.constant.IMAGE_BASE_PNG)) {
        this.imgAfter = pictureAfter;
      } else {
        this.imgAfter = this.constant.IMAGE_BASE_JPEG + pictureAfter;
      }
    }
  }
}
