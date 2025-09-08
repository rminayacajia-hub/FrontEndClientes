import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente';

declare const Swal: any;

@Component({
  selector: 'app-nuevo-cliente',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevo-cliente.html',
  styleUrl: './nuevo-cliente.css'
})
export class NuevoCliente {
  clienteforms: FormGroup = new FormGroup({});
  titulo_formulario = 'Registro de nuevo cliente';
  id: number = 0;
  Editar: boolean = false;
  constructor(
    private clienteServicio: ClienteService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
    this.clienteforms = new FormGroup({
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
    this.parametros.params.subscribe((parametros) => {
      if (parametros['id']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de cliente';
        this.id = parametros['id'];
        this.Editar = true;
        this.clienteServicio.uncliente(this.id).subscribe((cliente) => {
          this.clienteforms.patchValue(cliente);
        });
      } else {
        //nuevo cliente
        this.clienteforms.reset();
      }
    });
  }

  ngOnInit() {}
  guardarCliente() {
    if (this.clienteforms.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del cliente?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      
      if (result.isConfirmed) {
        if (this.Editar == true) {
          const cliente = this.clienteforms.value;
          cliente.id = this.id;
          this.clienteServicio
            .actualizarCliente(cliente)
            .subscribe((cliente: any) => {
              if (cliente == null) {
                Swal.fire('Clientes', 'Error al guardar', 'error');
              }
              Swal.fire('Clientes', 'Se guardo con exito', 'success');
              this.clienteforms.reset();
              this.navegacion.navigate(['']);
            });
        } else {
          const cliente = this.clienteforms.value;
          this.clienteServicio
            .guardarCliente(cliente)
            .subscribe((uncliente) => {
              Swal.fire('Clientes', 'Se guardo con exito', 'success');
              this.clienteforms.reset();
              this.navegacion.navigate(['']);
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Clientes', 'El usuario cancelo la operacion', 'success');
      }
    });
  }

}
