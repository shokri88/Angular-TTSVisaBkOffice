import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  LoaderLoad(IsShow: boolean) {
    var loader = document.querySelector('#full-loader');
    loader?.classList.remove("loader-hide");
    if (IsShow) {
      loader?.classList.remove("loader-hide");
    }
    else if (!IsShow) {
      setTimeout(function () {
        loader?.classList.add("loader-hide");
      }, 1000);
    }
  }
}
