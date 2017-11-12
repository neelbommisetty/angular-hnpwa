import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'hn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  title = 'app';
  isBrowser = true;
 ngOnInit() {
   if (isPlatformBrowser(this.platformId)) {
      // Client only code.
     this.isBrowser = true;
   }
   if (isPlatformServer(this.platformId)) {
     // Server only code.
     this.isBrowser = false;
   }
 }
}
