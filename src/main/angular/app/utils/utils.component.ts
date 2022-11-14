import {Component, OnInit} from "@angular/core";
import {MessageService} from "../messages/message.service";
import {UtilsService} from "./utils.service";
import {LanguageInjectable} from "../LanguageInjectable";
import {Observable} from 'rxjs';

@Component({
    selector: 'app-utils',
    template: '',
    providers: [
        MessageService,
        UtilsService
    ]
})

export class UtilsComponent implements OnInit{

    constructor(private utilsService : UtilsService , public languageInjectable : LanguageInjectable) {
        //console.log("UtilsComponent Init");
        this.utilsService.initLanguage().subscribe(rep => {
            //console.log("language rep : ", rep);
            this.languageInjectable.property = rep;
        });
    }

    ngOnInit() {

    }

    initLanguage(utilsService : UtilsService , languageInjectable : LanguageInjectable): Observable<any> {
        console.log("UtilsComponent Init");
        return this.utilsService.initLanguage();
    }

}
