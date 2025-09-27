import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  newTodo = '';

  addTodo() {
    const tarea = this.newTodo.trim();
    if (!tarea) return;

    this.newTodo = '';
  }
}
