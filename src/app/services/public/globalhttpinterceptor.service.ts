// import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, catchError, throwError } from 'rxjs';
// import { ServerMessage } from '../../domains/models/ServerMessage';
// import { GlobalserviceService } from './globalservice.service';
// import { LocalsettingService } from './localsetting.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class GlobalhttpinterceptorService {

//   constructor(public router: Router, private _GlobalService: GlobalserviceService,private _Setting: LocalsettingService) {
//   }

//   handleError(error: any): void {

//     try {
//       var obj = error as ServerMessage;
//       this._Setting.ToastMessage(obj.type, obj.title, obj.message);
//     } catch
//     {
//       this._Setting.ToastMessage("Error", "Local Error", "Error In Local Operation");
//       console.error(error);
//       this._GlobalService.LoaderLoad(false);
//     }

//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((Error) => {

//         // if (String(Error.message).indexOf("GetPublicToken") > 0)
//         // window.location.href = "/"

//         console.error(Error);
//         this._GlobalService.LoaderLoad(false);

//         var objError = Error.error as ServerMessage
//         if (objError != null) {
//           this._Setting.ToastMessage("Error", "Server Error", objError.message);
//         }
//         else
//           this._Setting.ToastMessage("Error", "Server Error", Error.message);

//         return throwError(() => {
//           throw new Error(Error);
//         });
//       }))
//   }

//}

import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalhttpinterceptorService implements HttpInterceptor, ErrorHandler {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // به جای تزریق مستقیم HttpClient، از Injector استفاده کنید
    // مثال: const httpClient = this.injector.get(HttpClient);
    const modifiedReq = req.clone({
      setHeaders: {
        'Custom-Header': 'value'
      }
    });
    return next.handle(modifiedReq);
  }

  handleError(error: any): void {
    console.error('An error occurred:', error);
  }
}