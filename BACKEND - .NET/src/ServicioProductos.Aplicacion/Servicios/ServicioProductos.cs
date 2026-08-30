using ServicioProductos.Aplicacion.Contratos;
using ServicioProductos.Dominio.Contratos;
using ServicioProductos.Dominio.Entidades;

namespace ServicioProductos.Aplicacion.Servicios;

public sealed class ServicioProductos(IRepositorioProductos repositorio) : IServicioProductos
{
    public async Task<List<Producto>> ObtenerTodosAsync()
        => await repositorio.ObtenerTodosAsync();

    public async Task<Producto> CrearAsync(Producto producto)
    {
        producto.Id = Guid.NewGuid();
        await repositorio.AgregarAsync(producto);
        await repositorio.GuardarCambiosAsync();
        return producto;
    }

    public async Task<Producto?> ActualizarAsync(Guid id, Producto cambios)
    {
        var producto = await repositorio.ObtenerPorIdAsync(id);

        if (producto is null) 
            return null;
        producto.Nombre = cambios.Nombre;
        producto.Descripcion = cambios.Descripcion;
        producto.Categoria = cambios.Categoria;
        producto.UrlImagen = cambios.UrlImagen;
        producto.PrecioUnitario = cambios.PrecioUnitario;
        producto.Stock = cambios.Stock;
        producto.Estado = cambios.Estado;
        await repositorio.GuardarCambiosAsync();
        return producto;
    }

    public async Task<bool> EliminarAsync(Guid id)
    {
        var producto = await repositorio.ObtenerPorIdAsync(id);

        if (producto is null) 
            return false;
        producto.Estado = false;
        await repositorio.GuardarCambiosAsync();
        return true;
    }
}
