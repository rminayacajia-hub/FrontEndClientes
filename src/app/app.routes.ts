import { Routes } from '@angular/router';
import { Usuarios } from './Administracion/usuarios/usuarios';
import { Cliente } from './cliente/cliente';
import { Login } from './Administracion/login/login';
import { NuevoCliente } from './cliente/nuevo-cliente/nuevo-cliente';

export const routes: Routes = [
    {
        path: '', 
        component: Cliente,
        pathMatch: 'full'
    },
    {
        path: 'nuevo-cliente', 
        component: NuevoCliente,
        pathMatch: 'full'
    },
    {
        path: 'editar-cliente/:id', 
        component: NuevoCliente,
        pathMatch: 'full'
    },
  {
    path: 'admin',
    children: [
      {
        path: 'Usuarios',
        component: Usuarios,

      },
        {
            path: 'Inicio',
            component: Login,
        }

    ],
  },
     
    
];
