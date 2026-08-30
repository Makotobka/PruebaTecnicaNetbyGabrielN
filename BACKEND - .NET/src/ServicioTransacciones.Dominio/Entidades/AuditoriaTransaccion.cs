namespace ServicioTransacciones.Dominio.Entidades;

public sealed class AuditoriaTransaccion
{
    public Guid Id { get; set; }
    public Guid IdTransacciones { get; set; }
    public string Accion { get; set; } = string.Empty;
    public DateTime FechaCambioUtc { get; set; }
    public string UsuarioCambio { get; set; } = string.Empty;
    public string? ValoresAnteriores { get; set; }
    public string? ValoresNuevos { get; set; }
}
