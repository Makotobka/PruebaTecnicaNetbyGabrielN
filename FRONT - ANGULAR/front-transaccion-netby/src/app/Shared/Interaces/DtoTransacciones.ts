import { DtoAuditoria } from './DtoAuditoria';

export interface Transaccion {
  id?: string;
  idProducto?: string;
  fechaTransaccion?: Date;
  tipoTransaccion?: string;
  cantidad?: number;
  precioUnitario?: number;
  precioTotal?: number;
  detalle?: string;
  estado?: boolean;
  auditoria?: DtoAuditoria[];
}
