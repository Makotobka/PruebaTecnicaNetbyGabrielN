export interface DtoAuditoria {
  id?: string;
  idRegistro?: string;
  accion?: string;
  fechaCambioUtc?: Date;
  usuarioCambio?: string;
  valoresAnteriores?: string;
  valoresNuevos?: string;
}
