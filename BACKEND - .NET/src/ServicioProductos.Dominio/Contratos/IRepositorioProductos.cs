using ServicioProductos.Dominio.Entidades;

namespace ServicioProductos.Dominio.Contratos;

public interface IRepositorioProductos
{
    Task<List<Producto>> ObtenerTodosAsync();
    Task<List<Producto>> ObtenerFiltrados(Producto producto);
    Task<Producto?> ObtenerPorIdAsync(Guid id);
    Task AgregarAsync(Producto producto);
    Task AgregarAuditoriaAsync(AuditoriaProducto auditoria);
    Task GuardarCambiosAsync();
}
