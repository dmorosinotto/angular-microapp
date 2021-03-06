import { Observable } from 'rxjs';
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  // selector: 'client-a',
  template: `
      <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {

  @Input('state') 
  set state(state: string) {
      console.debug('client-a received state', state);
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
      console.log("CLIENT-A IS RUNNING STANDALONE");
      this.router.navigate(['/client-a/page1']);
    }

    // just for demonstration!
    this._dispatch('client a initialized!');
  }


  //CROSS miniSPA COMNICATION ("PING-PONG")
  _dispatch(action: any) {
    setTimeout(() => { 
      this.message.next(action);
    }, 2000);
  }

  _reducer(action: any) {
    if (action && action.A) {
      alert("A) PING " + action.A);
      this._dispatch({B: Math.random(), ping: action.A });
    }
  }
}
