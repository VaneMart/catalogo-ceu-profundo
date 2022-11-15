import * as $ from 'jquery';
import * as M from 'materialize-css';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('mobile') sideNav? : ElementRef;

  title = 'catalogo-ceu-profundo';
  isActive = true;
  isAdmin = true;
  coords: any;
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.coords = position.coords;
    });
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngAfterViewInit(): void {
    let $sideNav = $('#side-nav');
    M.Sidenav.init($sideNav);
  }
}
