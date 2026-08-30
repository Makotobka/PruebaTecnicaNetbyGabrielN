using Microsoft.EntityFrameworkCore;
using ServicioProductos.Dominio.Contratos;
using ServicioProductos.Dominio.Entidades;
using ServicioProductos.Infraestructura.Persistencia;

namespace ServicioProductos.Infraestructura.Repositorios;

public class RepositorioProductos(ContextoProductos contexto) : IRepositorioProductos
{
    public async Task<List<Producto>> ObtenerTodosAsync()
        => await contexto.Productos.Include(producto => producto.Auditorias).OrderBy(producto => producto.Id).ToListAsync();

    public Task<Producto?> ObtenerPorIdAsync(Guid id) =>
        contexto.Productos.Include(producto => producto.Auditorias).FirstOrDefaultAsync(producto => producto.Id == id);

    public Task AgregarAsync(Producto producto) =>
        contexto.Productos.AddAsync(producto).AsTask();

    public Task GuardarCambiosAsync() => contexto.SaveChangesAsync();
}
