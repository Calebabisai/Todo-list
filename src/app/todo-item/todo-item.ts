import { Component, Input } from '@angular/core';
import { Todo } from '../todoService'; 
import { TodoService } from '../todoService';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css'
})
export class TodoItem {
  @Input() todo!: Todo;
  @Input() index!: number;

  constructor(private todoService: TodoService) {}

  toggleComplete() {
    this.todoService.toggleComplete(this.index);
  }

  deleteTodo() {
    if (confirm('¿Eliminar esta tarea?')) {
      this.todoService.deleteTodo(this.index);
    }
  }
}
