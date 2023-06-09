import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

type Todo = {
  name: string;
  completed: boolean;
};

@Component({
  selector: 'app-todos-container',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './todos-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .cdk-drag-placeholder {
        opacity: 0;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .example-box:last-child {
        border: none;
      }

      .example-list.cdk-drop-list-dragging
        .example-box:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class TodosContainerComponent {
  tasks = signal([
    { name: 'Get to work', completed: false },
    { name: 'Pick up groceries', completed: false },
    { name: 'Go home', completed: false },
    { name: 'Fall asleep', completed: false },
  ]);

  done = computed(() => this.tasks().filter((t) => t.completed));
  todos = computed(() => this.tasks().filter((t) => !t.completed));

  drop(event: CdkDragDrop<Todo[]>) {
    console.log('event: ', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
