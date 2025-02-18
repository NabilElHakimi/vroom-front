import { Component, Input } from '@angular/core';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-success-toast',
  standalone: true,
  imports: [NgIf],
  templateUrl: './success-toast.component.html',
  styleUrl: './success-toast.component.css'
})
export class SuccessToastComponent {

  @Input() message: string = '';
  @Input() type: string = '';


  constructor(private successToastService: SuccesstoastService) {}

  close() {
    this.successToastService.showToast(null);
  }
}
