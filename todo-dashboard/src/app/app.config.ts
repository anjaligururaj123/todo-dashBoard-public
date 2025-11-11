import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TODO_REPOSITORY } from './core/tokens/injection-tokens';
import { LocalTodoRepository } from './repositories/local-todo.repository';
 //import { MockApiTodoRepository } from './repositories/mock-api-todo.repository';
 //import { InMemoryTodoRepository } from './repositories/in-memory-todo.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //  TO SWITCH REPOSITORIES, CHANGE THIS LINE:
     { provide: TODO_REPOSITORY, useClass: LocalTodoRepository }
     //{ provide: TODO_REPOSITORY, useClass: MockApiTodoRepository }
     //{ provide: TODO_REPOSITORY, useClass: InMemoryTodoRepository }
  ]
};
