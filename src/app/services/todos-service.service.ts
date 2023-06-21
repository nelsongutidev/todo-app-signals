import { Injectable, computed, signal, effect } from '@angular/core';

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
}
