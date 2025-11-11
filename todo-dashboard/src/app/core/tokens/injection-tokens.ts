import { InjectionToken } from '@angular/core';
import { ITodoRepository } from '../interfaces/todo-repository.interface';

export const TODO_REPOSITORY = new InjectionToken<ITodoRepository>(
  'TODO_REPOSITORY'
);