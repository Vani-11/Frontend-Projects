import { Component, signal } from '@angular/core';
import { Quiz } from './quiz/quiz';


@Component({
  selector: 'app-root',
  imports: [Quiz],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('quiz-app');
  
}



