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
    public async Task<ActionResult<Producto>> Crear(
        Producto producto, 
        [FromHeader(Name = "X-Usuario")] string? usuario
    )
    {
        if (string.IsNullOrWhiteSpace(usuario)) return BadRequest("Debe enviar el encabezado X-Usuario");
        var creado = await servicio.CrearAsync(producto, usuario);
        return CreatedAtAction(nameof(ObtenerTodos), new { id = creado.Id }, creado);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Producto>> Actualizar(
        Guid id, 
        Producto producto, 
        [FromHeader(Name = "X-Usuario")] string? usuario
    )
    {
        if (string.IsNullOrWhiteSpace(usuario)) return BadRequest("Debe enviar el encabezado X-Usuario");
        var actualizado = await servicio.ActualizarAsync(id, producto, usuario);
        return actualizado is null ? NotFound() : Ok(actualizado);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Eliminar(
        Guid id,
        [FromHeader(Name = "X-Usuario")] string? usuario
    ) =>
        await servicio.EliminarAsync(id, usuario) ? Ok() : NotFound();


    [HttpPut("activar/{id:guid}")]
    public async Task<ActionResult<Producto>> Activar(
      Guid id,
      [FromHeader(Name = "X-Usuario")] string? usuario
    )
    {
        if (string.IsNullOrWhiteSpace(usuario)) return BadRequest("Debe enviar el encabezado X-Usuario");
        return await servicio.ActivarAsync(id, usuario) ? Ok() : NotFound();
    }
    
}
