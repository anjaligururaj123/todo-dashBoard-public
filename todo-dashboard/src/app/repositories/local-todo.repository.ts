import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Todo } from '../core/models/todo.model';
import { ITodoRepository } from '../core/interfaces/todo-repository.interface';

@Injectable()
export class LocalTodoRepository implements ITodoRepository {
  private readonly STORAGE_KEY = 'todos';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getTodos(): Observable<Todo[]> {
    const todos = this.getFromStorage();
    return of(todos);
  }

  add(todo: Todo): Observable<Todo> {
    const todos = this.getFromStorage();
    const newTodo = { ...todo, id: Date.now() };
    todos.push(newTodo);
    this.saveToStorage(todos);
    return of(newTodo);
  }

  update(todo: Todo): Observable<Todo> {
    const todos = this.getFromStorage();
    const index = todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      todos[index] = todo;
      this.saveToStorage(todos);
    }
    return of(todo);
  }

  delete(id: number): Observable<void> {
    const todos = this.getFromStorage().filter(t => t.id !== id);
    this.saveToStorage(todos);
    return of(void 0);
  }

  private getFromStorage(): Todo[] {
    if (!this.isBrowser) {
      return []; 
    }
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(todos: Todo[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    }
  }
}