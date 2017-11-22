import { IStory } from './../Models/Story';
import { HnapiService } from './../hnapi.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hn-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  stories: IStory[];
  constructor(private hnapi: HnapiService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      const type = `${params.type}stories`;
      this.hnapi
        .getList(type)
        .then((stories: IStory[]) => {
          this.stories = stories;
        })
        .catch(err => {
          console.error(err);
        });
    });
  }
}
