import { Injectable, computed, signal, effect } from '@angular/core';

const createRandomId = () => Math.round(Math.random() * 10000).toString();

export type Task = {
  name: string;
  completed: boolean;
  id: string;
};

@Injectable({
  providedIn: 'root',
})
export class TodosServiceService {
  // constructor() {
  //   effect(() => {
  //     this.tasks();
  //     console.log('signal changed');
  //   });
  // }
  tasks = signal<Task[]>([]);
  done = computed(() => this.tasks().filter((t: Task) => t?.completed));
  todos = computed(() => this.tasks().filter((t: Task) => !t?.completed));
  totals = computed(() => {
    return `${this.done().length} / ${this.tasks().length}`;
  });

  addTodo(name: string) {
    this.tasks.mutate((tasks) =>
      tasks.push({
        name,
        completed: false,
        id: createRandomId(),
      })
    );
  }

  removeTodo(task: Task) {
    this.tasks.update(
      (tasks) => (tasks = tasks.filter((t) => t.id !== task.id))
    );
  }

  completeTodo(task: Task) {
    this.tasks.mutate((tasks) => {
      const taskCompleted = tasks.find((t) => t.id === task.id);
      if (taskCompleted) {
        taskCompleted.completed = true;
      }
    });
  }

  markTodoAsIncomplete(task: Task) {
    this.tasks.mutate((tasks) => {
      const taskCompleted = tasks.find((t) => t.id === task.id);
      if (taskCompleted) {
        taskCompleted.completed = false;
      }
    });
  }
}
