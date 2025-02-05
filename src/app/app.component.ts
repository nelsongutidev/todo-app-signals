import { Component } from '@angular/core';

import { HeaderComponent } from './components/shared/header/header.component';
import { TodosContainerComponent } from './components/todos-container/todos-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TodosContainerComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'todo-app';
}
