using Microsoft.EntityFrameworkCore;
using ServicioTransacciones.Dominio.Contratos;
using ServicioTransacciones.Dominio.Entidades;
using ServicioTransacciones.Infraestructura.Persistencia;
namespace ServicioTransacciones.Infraestructura.Repositorios;
public sealed class RepositorioTransacciones(ContextoTransacciones contexto) : IRepositorioTransacciones
{
    public async Task<IReadOnlyList<TransaccionInventario>> ObtenerTodosAsync() => await contexto.Transacciones.AsNoTracking().Include(transaccion => transaccion.Auditorias).OrderByDescending(transaccion => transaccion.Fecha).ToListAsync();
    public Task AgregarAsync(TransaccionInventario transaccion) => contexto.Transacciones.AddAsync(transaccion).AsTask();
    public Task AgregarAuditoriaAsync(AuditoriaTransaccion auditoria) => contexto.AuditoriasTransacciones.AddAsync(auditoria).AsTask();
    public Task GuardarCambiosAsync() => contexto.SaveChangesAsync();
}
