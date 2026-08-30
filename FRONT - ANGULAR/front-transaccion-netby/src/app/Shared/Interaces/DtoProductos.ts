interface producto {
  idProducto?: string;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  urlImagen?: string;
  precioUnitario?: number;
  stock?: number;
  categoria?: string;
  estado?: boolean;
  auditoria?: DtoAuditoria[];
}
