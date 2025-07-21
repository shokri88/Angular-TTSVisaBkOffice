import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  LoaderLoad(IsShow: boolean) {
    var loader = document.querySelector('#full-loader');
    loader?.classList.remove("loader-hide");
    // loader?.classList.remove("loader-show");
    if (IsShow) {
      loader?.classList.remove("loader-hide");
    }
    else if (!IsShow) {
      loader?.classList.add("loader-hide");
    }
  }
}
