import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../core/models/todo.model';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-input.html',
  styleUrls: ['./todo-input.scss']
})
export class TodoInput {
  @Output() addTodo = new EventEmitter<Partial<Todo>>();

  todoTitle = '';
  todoDescription = '';

  onSubmit(): void {
    if (this.todoTitle.trim()) {
      this.addTodo.emit({
        title: this.todoTitle.trim(),
        description: this.todoDescription.trim(),
        completed: false,
        createdAt: new Date()
      });
      this.todoTitle = '';
      this.todoDescription = '';
    }
  }
}
