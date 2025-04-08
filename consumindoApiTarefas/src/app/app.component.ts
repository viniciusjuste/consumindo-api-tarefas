import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/Task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'consumindoApiTarefas';
  url = 'http://localhost:5257/tasks';

  task$!: Observable<Task>;

  inputName = '';
  inputIsCompleted : boolean | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Adds a new task using the input values for id, name, and completion status.
   * Sends a POST request to the server with the new task details.
   * After a successful response, logs the task to the console and resets the input fields.
   */
  addTask() {
    const newTask = {
      name: this.inputName,
      isCompleted: this.inputIsCompleted
    };

    this.http.post<Task>(`${this.url}/add`, newTask).subscribe((task) => {
      console.log(`Task added: ${task.name}`);
      this.inputName = '';
      this.inputIsCompleted = false;
    });
  }

}
