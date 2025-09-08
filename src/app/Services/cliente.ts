import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICliente } from '../Interfaces/icliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly rutaAPI="https://localhost:7020/api/Clientes";
  constructor(private http:HttpClient) { }

  todos():Observable<ICliente[]>{
    var clientes = this.http.get<ICliente[]>(this.rutaAPI).pipe(catchError(this.manejoErrores))
    return clientes;
  }
  
  manejoErrores(error:HttpErrorResponse){
    const msg = error.error?.message || error.error.statusText || 'Error de Red'
    return throwError(() => {new Error(msg);
  });
  }
  
  guardarCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.rutaAPI, cliente).pipe(catchError(this.manejoErrores)
  )
  }
  actualizarCliente(cliente: ICliente): any{
    return this.http.put<ICliente>(`${this.rutaAPI}/${cliente.id}`, cliente).pipe(catchError(this.manejoErrores)
  )
  }
  uncliente(id:number): Observable<ICliente>{
    return this.http.get<ICliente>(`${this.rutaAPI}/${id}`).pipe(catchError(this.manejoErrores)
  )
  }
  eliminarCliente(id:number): Observable<number>{
    return this.http.delete<number>(`${this.rutaAPI}/${id}`).pipe(catchError(this.manejoErrores)
  )}

}


