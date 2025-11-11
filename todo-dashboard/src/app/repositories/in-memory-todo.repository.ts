import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../core/models/todo.model';
import { ITodoRepository } from '../core/interfaces/todo-repository.interface';

@Injectable()
export class InMemoryTodoRepository implements ITodoRepository {
  private todosSubject = new BehaviorSubject<Todo[]>([
    { 
      id: 1, 
      title: 'In-Memory Todo 1', 
      description: 'This is stored in memory',
      completed: false, 
      createdAt: new Date() 
    }
  ]);

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  add(todo: Todo): Observable<Todo> {
    const newTodo = { ...todo, id: Date.now() };
    const currentTodos = this.todosSubject.value;
    this.todosSubject.next([...currentTodos, newTodo]);
    return new BehaviorSubject(newTodo).asObservable();
  }

  update(todo: Todo): Observable<Todo> {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map(t => t.id === todo.id ? todo : t);
    this.todosSubject.next(updatedTodos);
    return new BehaviorSubject(todo).asObservable();
  }

  delete(id: number): Observable<void> {
    const currentTodos = this.todosSubject.value;
    const filteredTodos = currentTodos.filter(t => t.id !== id);
    this.todosSubject.next(filteredTodos);
    return new BehaviorSubject<void>(void 0).asObservable();
  }
}
