using ServicioTransacciones.Dominio.Entidades;
namespace ServicioTransacciones.Dominio.Contratos;
public interface IRepositorioTransacciones
{
    Task<IReadOnlyList<TransaccionInventario>> ObtenerTodosAsync();
    Task AgregarAsync(TransaccionInventario transaccion);
    Task AgregarAuditoriaAsync(AuditoriaTransaccion auditoria);
    Task GuardarCambiosAsync();
}
