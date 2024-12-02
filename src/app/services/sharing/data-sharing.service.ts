import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  scrollRequest: EventEmitter<string> = new EventEmitter();

  constructor() { }

  scrollTo(value: string): void {
    this.scrollRequest.emit(value);
  }



}
