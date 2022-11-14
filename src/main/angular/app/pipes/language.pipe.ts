import { Pipe, PipeTransform } from '@angular/core';
import {LanguageInjectable} from "../LanguageInjectable";

@Pipe({ name: 'language' })
export class LanguagePipe implements PipeTransform {

    constructor(private languageInjectable:LanguageInjectable) {}

    transform(key : string) {
        return this.languageInjectable.property[key];
    }
}
