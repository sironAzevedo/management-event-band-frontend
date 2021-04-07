import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-skeleton',
  templateUrl: './list-skeleton.page.html',
  styleUrls: ['./list-skeleton.page.scss'],
})
export class ListSkeletonPage implements OnInit {

  @Input() items: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
