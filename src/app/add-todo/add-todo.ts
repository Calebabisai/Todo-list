//**Componente que permite añadir nuevas tareas */

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
  /**Modelo para el input de nueva tarea */
  newTodo = '';
  /**Inyecta el servicio TodoService para gestionar las tareas */
  constructor(private todoService: TodoService) {}
  /**Añade una nueva tarea y limpia el input
   * @param newTodo Texto de la nueva tarea
   */
  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = '';
  }
}
