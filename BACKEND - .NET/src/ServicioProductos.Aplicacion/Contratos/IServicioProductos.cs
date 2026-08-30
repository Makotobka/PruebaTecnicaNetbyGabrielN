using ServicioProductos.Dominio.Entidades;

namespace ServicioProductos.Aplicacion.Contratos;

public interface IServicioProductos
{
    Task<List<Producto>> ObtenerTodosAsync();
    Task<Producto> CrearAsync(Producto producto);
    Task<Producto?> ActualizarAsync(Guid id, Producto producto);
    Task<bool> EliminarAsync(Guid id);
}
