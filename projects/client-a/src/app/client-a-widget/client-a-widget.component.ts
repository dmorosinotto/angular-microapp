import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  //selector: 'client-a-widget',
  template: `
  <div id="widget">
  <div class="card">
    <div class="header">
      <h1 (click)="clickMe()">WebComp Widget - Click ME</h1>
      <pre>DATA.value = {{value$|push}}</pre>
    </div>
    <div class="content">
  <table class="table table-contensed">
      <thead>
      <tr>
          <th>Id</th>
          <th>From</th>
          <th>To</th>
      </tr>
      </thead>
      <tr>
          <td>4711</td>
          <td>Graz</td>
          <td>Frankfurt</td>
      </tr>
      <tr>
          <td>4712</td>
          <td>Frankfurt</td>
          <td>Graz</td>
      </tr>
   </table>
</div>


  `,
  styles: [`
        #widget { padding:10px; border: 2px darkred dashed }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientAWidgetComponent implements OnInit, AfterViewInit {
    @Output() evento = new EventEmitter<any>();
    @Input() set data(ctrl: FormControl) {
      console.log("IN SET DATA",ctrl);
      this._ctrl = ctrl;
      ctrl.valueChanges.subscribe(this.value$);
    };
    get data(): FormControl {
      return this._ctrl;
    }
    private _ctrl: FormControl;
  
    public value$ = new BehaviorSubject<string>("");
    ngOnInit(): void {
      console.log("ONINIT",this.data);
      //this.data.valueChanges.subscribe(x => console.debug("DA DENTRO AL WIDGET" , x));
      //this.value$ = this.data.valueChanges;
    }

    ngAfterViewInit(){
      console.log("AFTERVIEWINIT",this.data);
      //this.data.valueChanges.subscribe(x => console.debug("DA DENTRO AL WIDGET" , x));
      //this.value$ = this.data.valueChanges;
    }

    clickMe(): void {
      console.debug('click emit evento!');
      this.evento.emit("CIAO by " + this.value$.getValue());
      var rndMs = Math.random()*10000; //WAIT MAX 10sec AND GENERATE NEW VALUE
      setTimeout(()=> this._ctrl.setValue("AFTER " + rndMs), rndMs);
    }
}
