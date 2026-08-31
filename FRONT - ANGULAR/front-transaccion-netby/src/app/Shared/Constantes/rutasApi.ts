export const RUTAS_APIS_PRODUCTOS = {
  GET_OBTENER_TODOS_PRODUCTOS: 'productos',
  POST_INSERTAR_PRODUCTO: 'productos',
  POST_OBTENER_PRODUCTOS_FILTROS: 'productos/buscarFiltros',
  PUT_MODIFICAR_PRODUCTO: 'productos/', //'productos/{id}',
  DELETE_ELIMINAR_PRODUCTO: 'productos/', //'productos/{id}',
  PUT_ACTIVAR_PRODUCTO: 'productos/activar/', //'productos/activar/{id}',
};

export const RUTAS_APIS_TRANSACCIONES = {
  GET_OBTENER_TRANSACCIONES: 'transacciones',
  GET_OBTENER_TRANSACCIONES_PRODUCTO: 'transacciones/producto',
  POST_INSERTAR_TRANSACCION: 'transacciones',
  PUT_MODIFICAR_TRANSACCION: 'transacciones',
  DELETE_ELIMINAR_TRANSACCION: 'transacciones',
};
