import { Injectable } from '@angular/core';
import { MessageService } from '../messages/message.service';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Mail} from '../models/NewMail';
import {User} from '../models/User';

export interface Success {
  message: string;
}

@Injectable()
export class DynamicChangeMailService {

  constructor(private http: HttpClient, private messageService: MessageService) { }



    public getUserInfo(): Observable<any> {
        console.log("getting user info")
        return this.http.get<User>('/api/get_user_info').pipe(
            catchError(error => {
                this.messageService.error(error.error);
                console.log("CUSTOM ERROR :", error)
                return of([]);
            })
        );
    }





    public ChangerEmail(mail:Mail): Observable<Success> {
    return this.http.put<Mail>(`/ChangeMail`, mail).pipe(
        catchError(error => {
          this.messageService.error(error.error["message"]);
          return of(null);
        })
    );
  }

  }
