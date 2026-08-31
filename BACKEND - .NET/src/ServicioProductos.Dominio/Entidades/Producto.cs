namespace ServicioProductos.Dominio.Entidades;

public sealed class Producto
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public string Categoria { get; set; } = string.Empty;
    public string? UrlImagen { get; set; }
    public decimal PrecioUnitario { get; set; }
    public int Stock { get; set; }
    public bool Estado { get; set; } = true;
    public List<AuditoriaProducto> Auditorias { get; set; } = [];
}
