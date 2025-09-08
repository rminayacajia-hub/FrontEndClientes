import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICliente } from '../Interfaces/icliente';
import { ClienteService } from '../Services/cliente';

declare const Swal: any;

@Component({
  selector: 'app-cliente',
  standalone: true, 
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css'] 

})
export class Cliente implements OnInit {


  lista_clientes$!: ICliente[]; 
  cargando: boolean = false;
  error: string | null = null;
  Eliminar: boolean = false;

  constructor(private clienteServicio: ClienteService) { }

  ngOnInit(): void {
    this.cargatabla();
  }

  cargatabla(): void {
    this.cargando = true;
    this.error = null;

    this.clienteServicio.todos().subscribe({
      next: (clientes) => {
        this.lista_clientes$ = clientes;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.error = 'No se pudieron cargar los clientes. Intente más tarde.';
        this.cargando = false;
      }
    });
  }

  eliminarCliente(id: number) {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea eliminar este cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#838688ff',
      confirmButtonText: 'Eliminar!!!!!!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminarCliente(id).subscribe((id) => {
          if (id > 0) {
            this.cargatabla();
            Swal.fire(
              'Cliente Eliminado!',
              'Gracias por confiar en nuestros servicios!.',
              'success'
            );
          }
        });
      }
    });
  }
  variables_sesion(id: number) {
    sessionStorage.setItem('id_cliente', id.toString());
    alert("Variable creada: "+ sessionStorage.getItem('id_cliente'));
  }
  eliminarvariable() {
    var confirmar = confirm("Esta seguro que desea eliminar la variable de sesion?");
   if (confirmar == true) {   
    sessionStorage.removeItem('id_cliente');
   alert("Variable eliminada");
  } }
}