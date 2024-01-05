import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class HttpCancellationService {
  private cancelPendingHttp$: Subject<boolean> = new Subject<boolean>();

  cancel() {
    this.cancelPendingHttp$.next(true);
  }

  onCancel() {
    return this.cancelPendingHttp$;
  }
}
