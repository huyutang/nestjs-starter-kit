import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, of } from "rxjs";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(
        catchError(
          err => {
            //console.log("@@@@@@", err.root);
            return of("I", "II", "III", "IV", "V");
          }
        )
      );
  }
}
