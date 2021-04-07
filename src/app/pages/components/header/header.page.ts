import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  @Input() titulo: string;
  @Input() defaultHref: string = '/';

  constructor() {}

  ngOnInit() {
    console.log('titulo is:', this.titulo);
    console.log('defaultHref is:', this.defaultHref);   
  }

}
