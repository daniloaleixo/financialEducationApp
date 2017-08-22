import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <md-toolbar color="primary">My App</md-toolbar>
  <md-input-container>
  <input mdInput placeholder="Favorite food" value="Sushi">
</md-input-container>
<button md-fab><md-icon>check</md-icon></button>
  <div>bla</div>
  `
})
//
// AppCompoennt has all the page with a header
//
export class AppComponent {
  title = 'app works!';
}
