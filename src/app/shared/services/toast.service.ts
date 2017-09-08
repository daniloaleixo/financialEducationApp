import { Injectable } from '@angular/core';

import { MdSnackBar } from '@angular/material';


@Injectable()
export class ToastService {

  constructor(public snackBar: MdSnackBar) {}

  public openSnackBar(message: string, action: string, duration: number = 2000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

}