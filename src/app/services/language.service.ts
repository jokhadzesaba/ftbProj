import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public language = new BehaviorSubject<boolean>(false);
  public $language = this.language.asObservable();
  constructor() { }
}
