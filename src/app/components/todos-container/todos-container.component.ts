import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const createRandomId = () => Math.round(Math.random() * 10000).toString();

import {
  Task,
  TodosServiceService,
} from 'src/app/services/todos-service.service';

@Component({
  selector: 'app-todos-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class TodosContainerComponent {
  todosService = inject(TodosServiceService);
  tasks = this.todosService.tasks;
  done = this.todosService.done;
  todos = this.todosService.todos;
  totals = this.todosService.totals;

  inputSignal = signal('');

  addTodo() {
    this.todosService.tasks.mutate((tasks) =>
      tasks.push({
        name: this.inputSignal(),
        completed: false,
        id: createRandomId(),
      })
    );
    this.inputSignal.set('');
  }

  removeTodo(task: Task) {
    this.todosService.tasks.update(
      (tasks) => (tasks = tasks.filter((t) => t.id !== task.id))
    );
  }

  completeTodo(task: Task) {
    this.todosService.tasks.mutate((tasks) => {
      const taskCompleted = tasks.find((t) => t.id === task.id);
      if (taskCompleted) {
        taskCompleted.completed = true;
      }
    });
  }

  markTodoAsIncomplete(task: Task) {
    this.todosService.tasks.mutate((tasks) => {
      const taskCompleted = tasks.find((t) => t.id === task.id);
      if (taskCompleted) {
        taskCompleted.completed = false;
      }
    });
  }
}
