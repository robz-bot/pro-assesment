import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  isFullscreenActive: boolean;

  constructor(@Inject(DOCUMENT) private document: any) {
    this.isFullscreenActive = false;
  }

  isFullscreenEneabled(): boolean {
    return Boolean(
      this.document.fullscreenEnabled ||
        this.document.webkitFullscreenEnabled ||
        this.document.mozFullScreenEnabled ||
        this.document.msFullscreenEnabled
    );
  }

  isFullscreen(): boolean {
    return Boolean(
      this.document.fullscreenElement ||
        this.document.webkitFullscreenElement ||
        this.document.mozFullScreenElement ||
        this.document.msFullscreenElement
    );
  }

  getFullscreenElement(): any {
    return (
      this.document.fullscreenElement ||
      this.document.webkitFullscreenElement ||
      this.document.mozFullScreenElement ||
      this.document.msFullscreenElement
    );
  }

  requestFullscreen(element: any = document.documentElement): void {
    if (this.isFullscreen()) return;
    if (this.document.fullscreenEnabled) {
      element
        .requestFullscreen()
        .then(() => {
          console.log('Document Entered Full screen mode');
          this.isFullscreenActive = this.isFullscreen();
        })
        .catch((err: { message: any; name: any; }) =>
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        );
    } else if (this.document.webkitFullscreenEnabled) {
      element
        .webkitRequestFullScreen()
        .then(() => {
          console.log('Document Entered Full screen mode');
          this.isFullscreenActive = this.isFullscreen();
        })
        .catch((err: { message: any; name: any; }) =>
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        );
    } else if (this.document.mozFullScreenEnabled) {
      element
        .mozRequestFullScreen()
        .then(() => {
          console.log('Document Entered Full screen mode');
          this.isFullscreenActive = this.isFullscreen();
        })
        .catch((err: { message: any; name: any; }) =>
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        );
    } else if (this.document.msFullscreenEnabled) {
      element
        .msRequestFullscreen()
        .then(() => {
          console.log('Document Entered Full screen mode');
          this.isFullscreenActive = this.isFullscreen();
        })
        .catch((err: { message: any; name: any; }) =>
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        );
    }
  }

  exitFullscreen(): void {
    if (this.isFullscreen()) return;
    if (this.document.fullscreenEnabled) {
      this.document
        .exitFullscreen()
        .then(() => {
          console.log('Document Exited from Full screen mode');
          this.isFullscreenActive = this.isFullscreen();
        })
        .catch((err: { message: any; name: any; }) =>
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        );
    } else if (this.document.webkitFullscreenEnabled) {
      this.document
        .webkitExitFullscreen()
        .then(() => {
          console.log('Document Exited from Full screen mode');
          this.isFullscreenActive = this.isFullscreen();
        })
        .catch((err: { message: any; name: any; }) =>
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        );
    } else if (this.document.mozFullScreenEnabled) {
      this.document
        .mozCancelFullScreen()
        .then(() => {
          console.log('Document Exited from Full screen mode');
          this.isFullscreenActive = this.isFullscreen();
        })
        .catch((err: { message: any; name: any; }) =>
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        );
    } else if (this.document.msFullscreenEnabled) {
      this.document
        .msExitFullscreen()
        .then(() => {
          console.log('Document Exited from Full screen mode');
          this.isFullscreenActive = this.isFullscreen();
        })
        .catch((err: { message: any; name: any; }) =>
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        );
    }
  }
}
