import { Component } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';
import { TodoService } from '../todoService';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoItem],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoComponent {
  constructor(public todoService: TodoService) {}
}

