import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Brightness } from '@ionic-native/brightness/ngx';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  screenWidth: number;
  screenHeight: number;
  setBrightness: number;
  setZoom: number;
  frameOne = true;
  frameTwo = false;
  frameThree = false;

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: this.cameraPreview.CAMERA_DIRECTION.FRONT,
    tapPhoto: false,
    toBack: true
  };

  constructor(
    private platform: Platform,
    private brightness: Brightness,
    private cameraPreview: CameraPreview
  ) {}

  ngOnInit() {
    this.platform.ready().then(async () => {
      this.cameraPreview.startCamera(this.cameraPreviewOpts)
        .then((res) => console.log(res))
        .catch(err => console.log(err));
      this.screenWidth = window.outerWidth;
      this.screenHeight = window.outerHeight;
      this.brightness.setBrightness(0.2);
      this.setZoom = await this.cameraPreview.setZoom(2);
    });
  }

  onChange(event) {
    if (this.platform.is('android')) {
      this.setBrightness = event.detail.value;
      this.brightness.setBrightness(this.setBrightness);
    }
  }

  zoomIn() {
    if (this.platform.is('android')) {
      this.setZoom += 10;
      this.cameraPreview.setZoom(this.setZoom);
    }
  }

  zoomOut() {
    if (this.platform.is('android')) {
      this.setZoom -= 10;
      if (this.setZoom > 0) {
        this.cameraPreview.setZoom(this.setZoom);
      }
    }
  }

  changeFrame() {
    switch (true) {
      case this.frameOne:
        this.frameOne = false;
        this.frameTwo = true;
        this.frameThree = false;
        break;
      case this.frameTwo:
        this.frameOne = false;
        this.frameTwo = false;
        this.frameThree = true;
        break;
      case this.frameThree:
        this.frameOne = true;
        this.frameTwo = false;
        this.frameThree = false;
        break;

      default:
        this.frameOne = true;
    }

  }

}
