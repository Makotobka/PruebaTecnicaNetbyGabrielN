import { DtoAuditoria } from './DtoAuditoria';

export interface Transaccion {
  id?: string;
  idProducto?: string;
  fecha?: Date;
  tipo?: string;
  cantidad?: number;
  precioUnitario?: number;
  precioTotal?: number;
  detalle?: string;
  estado?: boolean;
  auditoria?: DtoAuditoria[];
}

export interface TransaccionProducto extends Transaccion {
  nombre: string;
  categoria: string;
  urlImagen: string;
  stock: string;
}
