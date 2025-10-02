/**
 * Servicio encargado de gestionar las tareas (todos)
 * - Permite agregar, eliminar o completar una tarea
 * - Permite guardar los datos en localSorage y los persiste al recargar
 */

import { computed, Injectable, signal, effect } from '@angular/core';

/**
 * Representa una tarea (todo)
 * @property text Texto de la tarea
 * @property completed indica si la tarea está completada o no
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type Filter = 'all' | 'active' | 'completed';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<Todo[]>([]);
  filter = signal<Filter>('all');

  filteredTodos = computed(() => {
    const f = this.filter();
    const list = this.todos();
    if (f === 'active') return list.filter((t) => !t.completed);
    if (f === 'completed') return list.filter((t) => t.completed);
    return list;
  });

  pendingCount = computed(() => this.todos().filter((t) => !t.completed).length);

  /**Carga las tareas desde el localStorage al iniciar el servicio*/
  constructor() {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        this.todos.set(JSON.parse(stored));
      } catch (e) {
        console.warn('Error leyendo todos desde localStorage', e);
      }
    }
    effect(() => {
      try {
        localStorage.setItem('todos', JSON.stringify(this.todos()));
      } catch (e) {
        console.warn('No se han podido guardar todos en localStorage', e);
      }
    });
  }

  /** Agregar tarea
   * @param text Texto de la nueva tarea
   */
  addTodo(text: string) {
    const t = text?.trim();
    if (!t) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: t,
      completed: false,
    };
    this.todos.update((list) => [...list, newTodo]);
  }

  /** Eliminar tarea
   * @param id Identificador de la tarea a eliminar
   */
  deleteTodo(id: string) {
    this.todos.update((list) => list.filter((x) => x.id !== id));
  }
  /** Marcar completada/no completada
   * @param id Identificador de la tarea a alternar
   */
  toggleComplete(id: string) {
    this.todos.update((list) =>
      list.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x))
    );
  }
  /**
   * Actualiza el texto de una tarea ya creada
   * @param index Índice de la tarea a actualizar
   * @param newText Nuevo texto para la tarea
   */
  updateTodo(id: string, newText: string) {
    const t = newText?.trim();
    if (!t) return;
    this.todos.update((list) => list.map((x) => (x.id === id ? { ...x, text: t } : x)));
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

  //Filtros
  setFilter(f: Filter) {
    this.filter.set(f);
  }
}
