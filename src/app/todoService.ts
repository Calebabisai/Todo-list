import { Injectable } from '@angular/core';

export interface Todo {
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 private todos: Todo[] = [];
  //Sirve para obtener todas las tareas
 getTodos(): Todo[] {
  return this.todos
 }

  // Agregar tarea
  addTodo(text: string) {
    if (!text.trim()) return;
    this.todos.push({ text: text.trim(), completed: false });
  }

    deleteTodo(index: number) { 
      if (confirm("Estas seguro que quieres eliminar la tarea?")) {
        this.todos.splice(index, 1);
      }
  }
    // Marcar completada/no completada
  toggleComplete(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }
  // Contador de pendientes
  getPendingCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }
  
}
