import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private stateService: StateService) {
  }

  config = {
    "client-a": {
      loaded: false,
      path: 'client-a/main.js',
      element: 'client-a'
    },
    "client-b": {
      loaded: false,
      path: 'client-b/main.js',
      element: 'client-b'
    },
    
  };

  ngOnInit() {
    this.load('client-a');
    this.load('client-b');
  }

  load(name: string): void {

    const configItem = this.config[name];
    if (configItem.loaded) return;

    const content = document.getElementById('content');


    console.log("LAZY LOAD (RUNTIME) BUNDLE FOR miniSPA", name)
    const script = document.createElement('script');
    script.src = configItem.path;
    content.appendChild(script);
    script.onload = ()=>{
      console.log("NOW THE SCRIPT IS LOADED", configItem.path);
      const element: HTMLElement = document.createElement(configItem.element);
      content.appendChild(element);
      
      console.log("ATTACH EVENT & STATE FOR miniSPA CROSS-COMUNICATION ELEMENT<->SHELL");
      element.addEventListener('message', msg => this.handleMessage(msg));
      this.stateService.registerClient(element);
      
      //SAMPLE INIT STATE (SEND DATA PASSED TO miniSPA)
      element.setAttribute('state', 'init');
    }
    
    script.onerror = () => console.error(`error loading ${configItem.path}`);

  }

  handleMessage(msg): void {
    //SAMPLE HANDLE EVENT (READ DATA FROM miniSPA)
    console.debug('shell received message: ', msg.detail);
    //PROPAGETE MSG FOR CLIENTS (PING-PONG)
    var action = msg.detail;
    if (action && (action.A || action.B)) this.stateService.setState(action);
  }

}
