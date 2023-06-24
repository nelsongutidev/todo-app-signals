import { Injectable, computed, signal, effect, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

const createRandomId = () => Math.round(Math.random() * 10000).toString();

export type Task = {
  name: string;
  completed: boolean;
  id: string;
};

export const DATA_KEY = 'todos-app-data';

@Injectable({
  providedIn: 'root',
})
export class TodosServiceService {
  localStorageService = inject(LocalStorageService);

  tasks = signal<Task[]>(
    JSON.parse(this.localStorageService.getItem(DATA_KEY) || '[]')
  );
  done = computed(() => this.tasks().filter((t: Task) => t?.completed));
  todos = computed(() => this.tasks().filter((t: Task) => !t?.completed));
  totals = computed(() => {
    return `${this.done().length} / ${this.tasks()?.length}`;
  });

  constructor() {
    effect(() => {
      this.localStorageService.setItem(DATA_KEY, JSON.stringify(this.tasks()));
    });
  }

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

  toggleTodo(task: Task) {
    this.tasks.mutate((tasks) => {
      const taskToggled = tasks.find((t) => t.id === task.id);
      if (taskToggled) {
        taskToggled.completed = !taskToggled.completed;
      }
    });
  }
}
