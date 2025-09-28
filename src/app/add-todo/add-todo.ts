import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todoService';
import { TodoComponent } from '../todo/todo';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, TodoComponent],
  templateUrl: './add-todo.html',
  styleUrls: ['./add-todo.css'],
})
export class AddTodo {
  newTodo = '';

  constructor(private todoService: TodoService) {}

  addTodo(){
    this.todoService.addTodo(this.newTodo);
    this.newTodo = '';
  }
}
