import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private xmlContextSource = new BehaviorSubject<string | null>(null);
  currentXmlContext = this.xmlContextSource.asObservable();

  constructor() { }

  updateXmlContext(xml: string) {
    this.xmlContextSource.next(xml);
  }
}
