import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { controlNameBinding } from "@angular/forms/src/directives/reactive_directives/form_control_name";

@Component({
  template: `
  <div class="card">

  <div class="header">
      <h2 class="title">Flight Search</h2>
  </div>
  <div class="content">
  
 
      <div class="form-group">
          <label>From:</label>
          <input name="from" class="form-control">
      </div>
      <div class="form-group">
          <label>To:</label>
          <input name="to" class="form-control" [formControl]="control">
      </div>
  
      <div class="form-group" #here>
          <button (click)="addWidget(here)"
              class="btn btn-default">Search</button>
          </div>
  
  </div>
  </div>
  `
})
export class Page1Component  {

  control = new FormControl();

  addWidget(here: HTMLElement) {
    try {
        var widget = document.createElement("client-a-widget");
        here.appendChild(widget);
        (<any>widget).data = this.control;
        widget.addEventListener("evento", (x: CustomEvent)=> {
            console.log("evento",x);
            alert(x.detail);
            this.control.setValue(x.detail);
        })
        this.control.setValue("OK WIDGET CREATED");
    } catch(ex) {
        console.error("SOMETHING GO WRONG",ex);
        this.control.setValue=ex;
    }
  }
}
