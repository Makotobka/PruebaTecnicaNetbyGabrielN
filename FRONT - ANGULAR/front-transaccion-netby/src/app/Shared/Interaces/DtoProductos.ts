import { DtoAuditoria } from './DtoAuditoria';

export interface Producto {
  idProducto?: string;
  nombre?: string;
  descripcion?: string;
  urlImagen?: string;
  precioUnitario?: number;
  stock?: number;
  categoria?: string;
  estado?: boolean;
  auditoria?: DtoAuditoria[];
}
