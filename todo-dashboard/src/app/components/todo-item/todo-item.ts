import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../core/models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.scss']
})
export class TodoItem {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Todo>();

  isEditing = false;
  editTitle = '';
  editDescription = '';

  onToggle(): void {
    this.toggle.emit({ ...this.todo, completed: !this.todo.completed });
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.todo.title;
    this.editDescription = this.todo.description || '';
  }

  saveEdit(): void {
    if (this.editTitle.trim()) {
      this.update.emit({ 
        ...this.todo, 
        title: this.editTitle.trim(),
        description: this.editDescription.trim()
      });
      this.isEditing = false;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}
