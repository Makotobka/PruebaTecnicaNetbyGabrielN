using Microsoft.AspNetCore.Mvc;
using ServicioProductos.Aplicacion.Contratos;
using ServicioProductos.Dominio.Entidades;

namespace ServicioProductos.Api.Controllers;

[ApiController]
[Route("api/productos")]
public sealed class ProductosController(IServicioProductos servicio) : ControllerBase
{
    [HttpGet]
    public Task<List<Producto>> ObtenerTodos() => servicio.ObtenerTodosAsync();

    [HttpPost]
    public async Task<ActionResult<Producto>> Crear(Producto producto)
    {
        var creado = await servicio.CrearAsync(producto);
        return CreatedAtAction(nameof(ObtenerTodos), new { id = creado.Id }, creado);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Producto>> Actualizar(Guid id, Producto producto)
    {
        var actualizado = await servicio.ActualizarAsync(id, producto);
        return actualizado is null ? NotFound() : Ok(actualizado);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Eliminar(Guid id) =>
        await servicio.EliminarAsync(id) ? NoContent() : NotFound();
}
