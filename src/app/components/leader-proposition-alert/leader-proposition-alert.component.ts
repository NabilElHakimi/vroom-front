import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-leader-proposition-alert',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './leader-proposition-alert.component.html',
  styleUrl: './leader-proposition-alert.component.css'
})
export class LeaderPropositionAlertComponent {

  @Input() leaderPropositionAlert = false;
  @Output() leaderPropositionAlertChange = new EventEmitter<boolean>();

  closeAlert() {
    this.leaderPropositionAlert = false;
    this.leaderPropositionAlertChange.emit(this.leaderPropositionAlert);
  }

}
