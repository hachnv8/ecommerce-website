import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpCancellationService } from '../services/http-cancellation.service';

@Injectable()
export class CancellationInterceptor implements HttpInterceptor {
    constructor(private httpCancelService: HttpCancellationService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        // cancel all pending http requests to api
        if (req.url && req.url.includes(environment.apiUrl)) {
            return next
                .handle(req)
                .pipe(takeUntil(this.httpCancelService.onCancel()));
        }
        return next.handle(req);
    }
}
