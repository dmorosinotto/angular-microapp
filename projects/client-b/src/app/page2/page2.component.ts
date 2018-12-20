import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  template: `
<div class="card">

  <div class="header">
      <h2 class="title">Details</h2>
  </div>
  <div class="content">
  

    <div class="form-group">
        <label>Id:</label>
        <input name="from" value="0001" class="form-control">
    </div>

    <div class="form-group">
        <label>Title:</label>
        <input name="to" value="Mag." class="form-control">
    </div>

    <div class="form-group">
        <label>First Name:</label>
        <input name="from" value="Manu" class="form-control">
    </div>

    <div class="form-group">
        <label>Last Name:</label>
        <input name="to" placeholder="WRITE SOMETHING HERE AN CLICK BTN" [formControl]="control" class="form-control">
    </div>
  
    <div class="form-group">
        <button class="btn btn-default">Search</button>
    </div>
  
  </div>
    
    <aside>
        WIDGET FROM CLIENT-A:
        <client-a-widget (evento)="handle($event)" [data]="control">
            <b class="err-wc">IF YOU SEE THIS MESSAGE client-a-widget WEBCOMPONENT IS NOT REGISTERED!</b>
        </client-a-widget>
    </aside>
</div>

    `,
    styles: [".err-wc { background:yellow; color:red; padding: 5px; }"]
})
export class Page2Component {

    public control = new FormControl;
    handle(e: CustomEvent) {
        console.info("EVENTO", e);
        this.control.setValue(e.detail);
    }
}

