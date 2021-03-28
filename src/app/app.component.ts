import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root', //<app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list'
  public todos: Todo[] = []
  public title: String = 'Minhas Tarefas'
  public form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(64),
        Validators.required
      ])]
    })

    this.load()
    // this.todos.push(new Todo(1, 'Passear com o cachorro', false))
    // this.todos.push(new Todo(2, 'Ir ao supermercado', true))
    // this.todos.push(new Todo(3, 'Cortar o cabelo', false))
  }

  changeMode(mode: String): void {
    this.mode = mode;
  }

  add(): void {
    const title = this.form.controls['title'].value
    const id = this.todos.length + 1
    this.todos.push(new Todo(id, title, false))
    this.save()
    this.clear()
  }

  remove(todo: Todo): void {
    const index = this.todos.indexOf(todo)
    if (index !== -1) {
      this.todos.splice(index, 1)
    }
    this.save()
  }

  markAsDone(todo: Todo): void {
    todo.done = true
    this.save()
  }

  markAsUndone(todo: Todo): void {
    todo.done = false
    this.save()
  }

  private clear(): void { 
    this.form.reset()
  }

  private save(): void {
    const data = JSON.stringify(this.todos)
    localStorage.setItem('todos', data)
  }

  private load(): void {
    const data = localStorage.getItem('todos')
    if (data) 
      this.todos = JSON.parse(data)
    else 
      this.todos = []
  }
}
