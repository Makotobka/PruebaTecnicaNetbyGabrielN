using ServicioProductos.Aplicacion.Contratos;
using ServicioProductos.Dominio.Contratos;
using ServicioProductos.Dominio.Entidades;
using ServicioProductos.Dominio.Enumeraciones;
using System.Text.Json;

namespace ServicioProductos.Aplicacion.Servicios;

public sealed class ServicioProductos(IRepositorioProductos repositorio) : IServicioProductos
{
    public async Task<List<Producto>> ObtenerTodosAsync()
        => await repositorio.ObtenerTodosAsync();

    public async Task<Producto> CrearAsync(Producto producto, string usuarioCambio)
    {
        producto.Id = Guid.NewGuid();
        await repositorio.AgregarAsync(producto);
        await repositorio.AgregarAuditoriaAsync(new AuditoriaProducto
        {
            IdProducto = producto.Id,
            Accion = GetEnumAccionTablaLogs.ToDescriptionString(EnumAccionTablaLogs.Crear),
            FechaCambioUtc = DateTime.UtcNow,
            UsuarioCambio = usuarioCambio,
            ValoresNuevos = ConvertirAJson(producto)
        });
        await repositorio.GuardarCambiosAsync();
        return producto;
    }

    public async Task<Producto?> ActualizarAsync(Guid id, Producto cambios, string usuarioCambio)
    {
        var producto = await repositorio.ObtenerPorIdAsync(id);

        if (producto is null) 
            return null;

        var valoresAnteriores = ConvertirAJson(producto);
        producto.Nombre = cambios.Nombre;
        producto.Descripcion = cambios.Descripcion;
        producto.Categoria = cambios.Categoria;
        producto.UrlImagen = cambios.UrlImagen;
        producto.PrecioUnitario = cambios.PrecioUnitario;
        producto.Stock = cambios.Stock;
        producto.Estado = cambios.Estado;
        await repositorio.AgregarAuditoriaAsync(new AuditoriaProducto
        {
            IdProducto = producto.Id,
            Accion = GetEnumAccionTablaLogs.ToDescriptionString(EnumAccionTablaLogs.Actualizar),
            FechaCambioUtc = DateTime.UtcNow,
            UsuarioCambio = usuarioCambio,
            ValoresAnteriores = valoresAnteriores,
            ValoresNuevos = ConvertirAJson(producto)
        });
        await repositorio.GuardarCambiosAsync();
        return producto;
    }

    public async Task<bool> EliminarAsync(Guid id, string usuarioCambio)
    {
        var producto = await repositorio.ObtenerPorIdAsync(id);

        if (producto is null) 
            return false;

        var valoresAnteriores = ConvertirAJson(producto);

        producto.Estado = false;
        await repositorio.AgregarAuditoriaAsync(new AuditoriaProducto
        {
            IdProducto = producto.Id,
            Accion = GetEnumAccionTablaLogs.ToDescriptionString(EnumAccionTablaLogs.Eliminar),
            FechaCambioUtc = DateTime.UtcNow,
            UsuarioCambio = usuarioCambio,
            ValoresAnteriores = null,
            ValoresNuevos = ConvertirAJson(producto)
        });

        await repositorio.GuardarCambiosAsync();
        return true;
    }

    public async Task<bool> ActivarAsync(Guid id, string usuarioCambio)
    {
        var producto = await repositorio.ObtenerPorIdAsync(id);

        if (producto is null)
            return false;

        var valoresAnteriores = ConvertirAJson(producto);

        producto.Estado = true;
        await repositorio.AgregarAuditoriaAsync(new AuditoriaProducto
        {
            IdProducto = producto.Id,
            Accion = GetEnumAccionTablaLogs.ToDescriptionString(EnumAccionTablaLogs.Activar),
            FechaCambioUtc = DateTime.UtcNow,
            UsuarioCambio = usuarioCambio,
            ValoresAnteriores = null,
            ValoresNuevos = ConvertirAJson(producto)
        });

        await repositorio.GuardarCambiosAsync();
        return true;
    }

    private static string ConvertirAJson(Producto producto) => JsonSerializer.Serialize(new
    {
        producto.Id,
        producto.Nombre,
        producto.Descripcion,
        producto.Categoria,
        producto.UrlImagen,
        producto.PrecioUnitario,
        producto.Stock,
        producto.Estado
    });
}
