using Microsoft.AspNetCore.Mvc;
using ServicioTransacciones.Aplicacion.Servicios;
using ServicioTransacciones.Dominio.Entidades;
using ServicioTransaccionesAplicacion = ServicioTransacciones.Aplicacion.Servicios.ServicioTransacciones;
namespace ServicioTransacciones.Api.Controllers;
[ApiController]
[Route("api/transacciones")]
public sealed class TransaccionesController(ServicioTransaccionesAplicacion servicio) : ControllerBase
{
    [HttpGet]
    public Task<IReadOnlyList<TransaccionInventario>> ObtenerTodos() => servicio.ObtenerTodosAsync();
    [HttpPost]
    public async Task<ActionResult<TransaccionInventario>> Crear(TransaccionInventario transaccion, [FromHeader(Name = "X-Usuario")] string? usuarioCambio)
    {
        if (string.IsNullOrWhiteSpace(usuarioCambio)) return BadRequest("Debe enviar el encabezado X-Usuario");
        return Ok(await servicio.RegistrarAsync(transaccion, usuarioCambio));
    }

    [HttpGet("producto")]
    public Task<IReadOnlyList<TransaccionInventarioProducto>> ObtenerTransaccionProductoTodos() => servicio.ObtenerTransaccionProductoTodosAsync();
}
