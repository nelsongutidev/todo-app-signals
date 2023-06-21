import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
}
