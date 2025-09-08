import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cliente } from './cliente/cliente';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('FrontEndClientes');
}
