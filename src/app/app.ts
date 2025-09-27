import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './todo/todo';
import { AddTodo } from './add-todo/add-todo';

@Component({
  selector: 'app-root',
  imports: [AddTodo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo-list');
}
