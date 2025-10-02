/**Componente que representa un ítem de tarea (todo) */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todoService';
import { TodoService } from '../todoService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input() todo!: Todo;
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: string; newText: string }>();

  editMode = false;
  editText = '';

  /**Inyecta el servicio TodoService para gestionar las tareas */
  constructor(private todoService: TodoService) {}
  /**Alterna el estado de completado/no completado */
  toggleComplete() {
    this.todoService.toggleComplete(this.todo.id);
  }
  /**Inicia el modo edición
   * @param editMode Indica si está en modo edición o no
   * @param editText Texto editable de la tarea
   */
  startEdit() {
    this.editText = this.todo.text;
    this.editMode = true;
  }
  /**Guarda los cambios realizados en la tarea
   * @param index Índice de la tarea a actualizar
   */
  saveEdit() {
    const trimmed = this.editText.trim();
    if (!trimmed) {
      return;
    }
    this.todoService.updateTodo(this.todo.id, trimmed);
    this.editMode = false;
  }
  /**Cancela el modo edición y restaura el texto original
   * @param editMode Este indica si esta en modo edicion o no
   * @param editText Texto editable de la tarea
   */
  cancelEdit() {
    this.editMode = false;
    this.editText = this.todo.text;
  }
  /**Elimina la tarea actual
   * @param index Indice de la tarea a eliminar
   */
  deleteTodo() {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.todoService.deleteTodo(this.todo.id);
    }
  }
}
