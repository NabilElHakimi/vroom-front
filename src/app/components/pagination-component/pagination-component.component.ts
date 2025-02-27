import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-pagination-component',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './pagination-component.component.html',
  styleUrl: './pagination-component.component.css'
})
export class PaginationComponentComponent {

  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    console.log(this.totalPages);
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

}
