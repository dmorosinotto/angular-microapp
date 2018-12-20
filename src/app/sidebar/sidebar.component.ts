import { StateService } from './../state.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    constructor(private stateService: StateService) {
    }

    sendState() {
        var rnd = Math.random();
        if (rnd>0.5) {
            this.stateService.setState({A: rnd, ping: 'Info from Shell' })
        } else {
            this.stateService.setState({B: rnd, pong: 'Info from Shell' })
        }
    }
}
