interface transaccion {
  idTransacciones?: string;
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
