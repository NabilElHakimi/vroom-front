  import { Component } from '@angular/core';
  import {Location} from '@angular/common';
  import {RouterLink} from '@angular/router';

  @Component({
    selector: 'app-welcome-leader',
    imports: [
      RouterLink
    ],
    templateUrl: './welcome-leader.component.html',
    styleUrl: './welcome-leader.component.css'
  })
  export class WelcomeLeaderComponent {

    constructor(private location:Location) {}
    goBack(): void {
      this.location.back();
    }

  }
