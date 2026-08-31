using Microsoft.EntityFrameworkCore;
using ServicioTransacciones.Dominio.Contratos;
using ServicioTransacciones.Dominio.Entidades;
using ServicioTransacciones.Infraestructura.Persistencia;
namespace ServicioTransacciones.Infraestructura.Repositorios;
public sealed class RepositorioTransacciones(ContextoTransacciones contexto) : IRepositorioTransacciones
{
    public async Task<IReadOnlyList<TransaccionInventario>> ObtenerTodosAsync() 
        => await contexto.Transacciones.Include(transaccion => transaccion.Auditorias).OrderByDescending(transaccion => transaccion.Fecha).ToListAsync();

    public async Task<IReadOnlyList<TransaccionInventarioProducto>> ObtenerTransaccionProductoTodosAsync() =>
        await (
            from transaccion in contexto.Transacciones.Include(transaccion => transaccion.Auditorias)
            join producto in contexto.Productos
                on transaccion.IdProducto equals producto.Id
            orderby transaccion.Fecha descending
            select new TransaccionInventarioProducto
            {
                Id = transaccion.Id,
                IdProducto = transaccion.IdProducto,
                Fecha = transaccion.Fecha,
                Tipo = transaccion.Tipo,
                Cantidad = transaccion.Cantidad,
                PrecioUnitario = transaccion.PrecioUnitario,
                Detalle = transaccion.Detalle,
                Estado = transaccion.Estado,
                Auditorias = transaccion.Auditorias,
                Nombre = producto.Nombre,
                Categoria = producto.Categoria,
                UrlImagen = producto.UrlImagen,
                Stock = producto.Stock
            }).ToListAsync();


    public Task AgregarAsync(TransaccionInventario transaccion) => contexto.Transacciones.AddAsync(transaccion).AsTask();
    public Task AgregarAuditoriaAsync(AuditoriaTransaccion auditoria) => contexto.AuditoriasTransacciones.AddAsync(auditoria).AsTask();
    public Task GuardarCambiosAsync() => contexto.SaveChangesAsync();
}
