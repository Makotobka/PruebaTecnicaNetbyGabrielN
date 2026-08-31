using Microsoft.EntityFrameworkCore;
using ServicioProductos.Dominio.Contratos;
using ServicioProductos.Dominio.Entidades;
using ServicioProductos.Infraestructura.Persistencia;

namespace ServicioProductos.Infraestructura.Repositorios;

public class RepositorioProductos(ContextoProductos contexto) : IRepositorioProductos
{
    public async Task<List<Producto>> ObtenerTodosAsync()
        => await contexto.Productos.Include(producto => producto.Auditorias).OrderBy(producto => producto.Id).ToListAsync();

    public async Task<List<Producto>> ObtenerFiltrados(Producto producto)
    {
        var consulta = contexto.Productos.Where(x => x.Estado);

        if ( producto?.Id != Guid.Empty)
            return await contexto.Productos.Where(x => x.Id == producto.Id).ToListAsync();

        if (string.IsNullOrEmpty(producto?.Nombre) == false)
            consulta = consulta.Where(x => x.Nombre.Contains(producto.Nombre));

        //=> await contexto.Productos.Include(producto => producto.Auditorias).OrderBy(producto => producto.Id).ToListAsync();
        return await consulta.ToListAsync();
    }



    public Task<Producto?> ObtenerPorIdAsync(Guid id) =>
        contexto.Productos.Include(producto => producto.Auditorias).FirstOrDefaultAsync(producto => producto.Id == id);

    public Task AgregarAsync(Producto producto) =>
        contexto.Productos.AddAsync(producto).AsTask();

    public Task AgregarAuditoriaAsync(AuditoriaProducto auditoria) =>
        contexto.AuditoriasProductos.AddAsync(auditoria).AsTask();

    public Task GuardarCambiosAsync() => contexto.SaveChangesAsync();
}
