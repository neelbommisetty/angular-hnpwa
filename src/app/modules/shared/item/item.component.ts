import { IStory } from './../Models/Story';
import { Input } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HnapiService } from '../hnapi.service';

@Component({
  selector: 'hn-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {
  @Input() story: IStory;

  constructor(private hnApi: HnapiService) {}

  ngOnInit() {
    // this.hnApi
    //   .getItem(this.id)
    //   .then((story: IStory) => {
    //     this.story = story;
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }
}
