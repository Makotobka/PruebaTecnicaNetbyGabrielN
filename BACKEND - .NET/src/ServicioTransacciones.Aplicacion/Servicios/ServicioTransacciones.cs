using ServicioTransacciones.Dominio.Contratos;
using ServicioTransacciones.Dominio.Entidades;
using ServicioTransacciones.Dominio.Enumeraciones;
using System.Text.Json;
namespace ServicioTransacciones.Aplicacion.Servicios;
public class ServicioTransacciones(IRepositorioTransacciones repositorio)
{
    public Task<IReadOnlyList<TransaccionInventario>> ObtenerTodosAsync() => repositorio.ObtenerTodosAsync();
    public Task<IReadOnlyList<TransaccionInventarioProducto>> ObtenerTransaccionProductoTodosAsync() => repositorio.ObtenerTransaccionProductoTodosAsync();
    public async Task<TransaccionInventario> RegistrarAsync(TransaccionInventario transaccion, string usuarioCambio)
    {
        if (transaccion.Cantidad <= 0) throw new ArgumentException("La cantidad debe ser mayor a cero.");
        transaccion.Id = Guid.NewGuid();
        await repositorio.AgregarAsync(transaccion);
        await repositorio.AgregarAuditoriaAsync(new AuditoriaTransaccion
        {
            IdTransacciones = new Guid(),
            Accion = GetEnumAccionTablaLogs.ToDescriptionString(EnumAccionTablaLogs.Crear),
            FechaCambioUtc = DateTime.UtcNow,
            UsuarioCambio = usuarioCambio,
            ValoresNuevos = JsonSerializer.Serialize(new
            {
                transaccion.Id,
                transaccion.IdProducto,
                transaccion.Fecha,
                transaccion.Tipo,
                transaccion.Cantidad,
                transaccion.PrecioUnitario,
                transaccion.Detalle,
                transaccion.Estado
            })
        });
        await repositorio.GuardarCambiosAsync();
        return transaccion;
    }
}
