/*
 * Angular 2 decorators and services
 */
import { Component, OnInit } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class Home implements OnInit {
    constructor(){}

    ngOnInit() {}
}