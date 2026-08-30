namespace ServicioProductos.Dominio.Entidades;

public sealed class AuditoriaProducto
{
    public Guid Id { get; set; }
    public Guid IdProducto { get; set; }
    public string Accion { get; set; } = string.Empty;
    public DateTime FechaCambioUtc { get; set; }
    public string UsuarioCambio { get; set; } = string.Empty;
    public string? ValoresAnteriores { get; set; }
    public string? ValoresNuevos { get; set; }
}
