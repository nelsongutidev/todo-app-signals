import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const createRandomId = () => Math.round(Math.random() * 10000).toString();

import { FormsModule } from '@angular/forms';

type Task = {
  name: string;
  completed: boolean;
  id: string;
};

@Component({
  selector: 'app-todos-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todos-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class TodosContainerComponent {
  inputSignal = signal('');
  tasks = signal<Task[]>([]);

  done = computed(() => this.tasks().filter((t: Task) => t?.completed));
  todos = computed(() => this.tasks().filter((t: Task) => !t?.completed));
  totals = computed(() => {
    return `${this.done().length} / ${this.tasks().length}`;
  });

  addTodo() {
    this.tasks.mutate((tasks) =>
      tasks.push({
        name: this.inputSignal(),
        completed: false,
        id: createRandomId(),
      })
    );
    this.inputSignal.set('');
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
