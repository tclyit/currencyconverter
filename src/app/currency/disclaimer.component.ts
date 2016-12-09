/*
 * Angular 2 decorators and services
 */
import { Component, OnInit } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'disclaimer',
  styleUrls: ['./disclaimer.component.scss'],
  templateUrl: './disclaimer.component.html'
})
export class Disclaimer implements OnInit {
    constructor(){}

    ngOnInit() {}
}