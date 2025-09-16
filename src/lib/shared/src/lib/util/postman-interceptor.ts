import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../environments/config';

export function postmanInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const config = inject(Config);

  if (config.postmanApiKey) {
    req = req.clone({
      setHeaders: {
        'x-api-key': config.postmanApiKey,
      },
    });
  }
  return next(req);
}
