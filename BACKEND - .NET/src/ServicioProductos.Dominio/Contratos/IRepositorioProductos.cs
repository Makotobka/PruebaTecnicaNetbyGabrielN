using ServicioProductos.Dominio.Entidades;

namespace ServicioProductos.Dominio.Contratos;

public interface IRepositorioProductos
{
    Task<List<Producto>> ObtenerTodosAsync();
    Task<Producto?> ObtenerPorIdAsync(Guid id);
    Task AgregarAsync(Producto producto);
    Task GuardarCambiosAsync();
}
