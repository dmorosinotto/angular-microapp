import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  // selector: 'client-b',
  template: `
      <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {

  @Input('state') 
  set state(state: string) {
      console.debug('client-b received state', state);
      this._reducer(JSON.parse(state));
  }

  @Output() message = new EventEmitter<any>();

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements ?
    
    // Standalone mode
    if (environment.standalone) {
      console.log("CLIENT-B STANDALONE SERVE");
      this.router.navigate(['/client-b/page1']);
    }
    
    // just for demonstration!
    this._dispatch('client b initialized!');
  }


  //CROSS miniSPA COMNICATION ("PING-PONG")
  _dispatch(action: any) {
    setTimeout(() => { 
      this.message.next(action);
    }, 2000);
  }

  _reducer(action: any) {
    if (action && action.B) {
      alert("B) PONG " + action.B);
      //this._dispatch({A: Math.random(), pong: action.B });
    }
  }
}
