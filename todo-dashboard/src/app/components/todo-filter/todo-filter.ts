import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filter.html',
  styleUrls: ['./todo-filter.scss']
})
export class TodoFilter {
  @Output() filterChange = new EventEmitter<FilterType>();
  
  activeFilter: FilterType = 'all';

  setFilter(filter: FilterType): void {
    this.activeFilter = filter;
    this.filterChange.emit(filter);
  }
}
