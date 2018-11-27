import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  list: any[] = [];
  constructor() { }
  ngOnInit() {
    for (let i = 0; i < 9999; i++) {
      const arr: any = [];
      for (let j = 0; j < 8; j++) {
        arr.push(Date.now() + 1);
      }
      this.list.push(arr);
    }
    
  }
  handleKeydown() {
    
  }
}
