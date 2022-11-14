import { Pipe, PipeTransform } from '@angular/core';
import {LanguageInjectable} from "../LanguageInjectable";

@Pipe({ name: 'letterTransform' })
export class LetterTransformPipe implements PipeTransform {

    constructor(private languageInjectable:LanguageInjectable) {}

    transform(word : string) {
        let first=word.substring(0,1).toLocaleUpperCase();
        let other=word.substring(1,word.length).toLowerCase();
        return first+other;
    }
}
