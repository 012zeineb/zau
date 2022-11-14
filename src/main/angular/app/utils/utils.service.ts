import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {MessageService} from "../messages/message.service";

@Injectable({ providedIn: 'root' })
export class UtilsService {

    constructor(private http: HttpClient, private messageService: MessageService) {}

    public initLanguage(): Observable<any> {
        //console.log("getting language properties");
        return this.http.get<any>('/utils/init-language').pipe(
            catchError(error => {
                this.messageService.error(error.error);
                console.log("CUSTOM ERROR :", error);
                return of([]);
            })
        );
    }
}
