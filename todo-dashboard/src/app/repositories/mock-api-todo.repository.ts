import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Todo } from '../core/models/todo.model';
import { ITodoRepository } from '../core/interfaces/todo-repository.interface';

@Injectable()
export class MockApiTodoRepository implements ITodoRepository {
  private todos: Todo[] = [
    { 
      id: 1, 
      title: 'Sample Todo 1', 
      description: 'This is a mock API todo',
      completed: false, 
      createdAt: new Date() 
    },
    { 
      id: 2, 
      title: 'Sample Todo 2', 
      description: 'Another mock todo',
      completed: true, 
      createdAt: new Date() 
    }
  ];

  getTodos(): Observable<Todo[]> {
    return of([...this.todos]).pipe(delay(500)); 
  }

  add(todo: Todo): Observable<Todo> {
    const newTodo = { ...todo, id: Date.now() };
    this.todos.push(newTodo);
    return of(newTodo).pipe(delay(300));
  }

  update(todo: Todo): Observable<Todo> {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todos[index] = todo;
    }
    return of(todo).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.todos = this.todos.filter(t => t.id !== id);
    return of(void 0).pipe(delay(300));
  }
}
