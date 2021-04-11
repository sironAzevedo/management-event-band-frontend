import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor() {
    console.log(this.firstName)
    console.log(this.lastName)
    console.log(this.middleInitial)
  }

}
