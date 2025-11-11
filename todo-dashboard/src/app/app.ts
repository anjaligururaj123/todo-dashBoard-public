import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Todo } from './core/models/todo.model';
import { ITodoRepository } from './core/interfaces/todo-repository.interface';
import { TODO_REPOSITORY } from './core/tokens/injection-tokens';
import { ThemeService, Theme, Layout } from './core/services/theme.service';
import { FilterType, TodoFilter } from './components/todo-filter/todo-filter';
import { TodoItem } from './components/todo-item/todo-item';
import { TodoInput } from './components/todo-input/todo-input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TodoInput,
    TodoItem,
    TodoFilter
  ],
  templateUrl: './app.html',  // ← Fixed!
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  currentFilter: FilterType = 'all';
  
  theme$: Observable<Theme>;
  layout$: Observable<Layout>;

  constructor(
    @Inject(TODO_REPOSITORY) private todoRepository: ITodoRepository,
    public themeService: ThemeService
  ) {
    this.theme$ = this.themeService.theme$;
    this.layout$ = this.themeService.layout$;
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoRepository.getTodos().subscribe(todos => {
      this.todos = todos;
      this.applyFilter();
    });
  }

  onAddTodo(todoData: Partial<Todo>): void {
    this.todoRepository.add(todoData as Todo).subscribe(() => {
      this.loadTodos();
    });
  }

  onToggleTodo(todo: Todo): void {
    this.todoRepository.update(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  onUpdateTodo(todo: Todo): void {
    this.todoRepository.update(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  onDeleteTodo(id: number): void {
    this.todoRepository.delete(id).subscribe(() => {
      this.loadTodos();
    });
  }

  onFilterChange(filter: FilterType): void {
    this.currentFilter = filter;
    this.applyFilter();
  }

  private applyFilter(): void {
    switch (this.currentFilter) {
      case 'active':
        this.filteredTodos = this.todos.filter(t => !t.completed);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter(t => t.completed);
        break;
      default:
        this.filteredTodos = [...this.todos];
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLayout(layout: Layout): void {
    this.themeService.setLayout(layout);
  }
}
