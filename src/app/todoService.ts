/**
 * Servicio encargado de gestionar las tareas (todos)
 * - Permite agregar, eliminar o completar una tarea
 * - Permite guardar los datos en localSorage y los persiste al recargar
 */

import { Injectable } from '@angular/core';

/**
 * Representa una tarea (todo)
 * @property text Texto de la tarea
 * @property completed indica si la tarea está completada o no
 */
export interface Todo {
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  /**Sirve para obtener todas las tareas
   * @returns Lista de tareas (copia del array interno)
   */
  getTodos(): Todo[] {
    return [...this.todos];
  }
  /**Carga las tareas desde el localStorage al iniciar el servicio*/
  constructor() {
    const storedTodos = localStorage.getItem('todos');
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
  }

  /** Agregar tarea
   * @param text Texto de la nueva tarea
   */
  addTodo(text: string) {
    if (!text.trim()) return;
    this.updateTodos(() => this.todos.push({ text: text.trim(), completed: false }));
  }
  /** Eliminar tarea
   * @param index Índice de la tarea a eliminar
   */
  deleteTodo(index: number) {
    this.updateTodos(() => this.todos.splice(index, 1));
  }
  /** Marcar completada/no completada
   * @param index Índice de la tarea a alternar
   */
  toggleComplete(index: number) {
    this.updateTodos(() => {
      this.todos[index].completed = !this.todos[index].completed;
    });
  }
  /**
   * Actualiza el texto de una tarea ya creada
   * @param index Índice de la tarea a actualizar
   * @param newText Nuevo texto para la tarea
   */
  updateTodo(index: number, newText: string) {
    const text = newText.trim();
    if (!text) return;
    this.updateTodos(() => {
      this.todos[index].text = text;
    });
  }
  /** Contador de pendientes
   * @returns Número de tareas no completadas
   */
  getPendingCount(): number {
    return this.todos.filter((t) => !t.completed).length;
  }
  /** Guardar en localStorage */
  private saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  /** Funcion que actualiza las tareas y guarda en localStorage
   * @param callback Función que modifica el array de tareas
   */
  private updateTodos(callback: () => void) {
    callback();
    this.saveToLocalStorage();
  }
}
