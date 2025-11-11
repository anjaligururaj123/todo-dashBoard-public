import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

export interface ITodoRepository {
  getTodos(): Observable<Todo[]>;
  add(todo: Todo): Observable<Todo>;
  update(todo: Todo): Observable<Todo>;
  delete(id: number): Observable<void>;
}