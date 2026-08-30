using ServicioProductos.Dominio.Entidades;

namespace ServicioProductos.Aplicacion.Contratos;

public interface IServicioProductos
{
    Task<List<Producto>> ObtenerTodosAsync();
    Task<Producto> CrearAsync(Producto producto, string usuarioCambio);
    Task<Producto?> ActualizarAsync(Guid id, Producto producto, string usuarioCambio);
    Task<bool> EliminarAsync(Guid id, string usuarioCambio);
    Task<bool> ActivarAsync(Guid id, string usuarioCambio);
}
