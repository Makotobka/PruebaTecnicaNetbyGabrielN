namespace ServicioTransacciones.Dominio.Entidades;

public sealed class ProductoConsulta
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string? UrlImagen { get; set; }
    public int Stock { get; set; }
}
