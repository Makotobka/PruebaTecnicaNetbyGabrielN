namespace ServicioTransacciones.Dominio.Entidades;

public enum TipoTransaccion { Compra, Venta }

public sealed class TransaccionInventario
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid IdProducto { get; set; }
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    public TipoTransaccion Tipo { get; set; }
    public int Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal PrecioTotal => Cantidad * PrecioUnitario;
    public string? Detalle { get; set; }
    public bool Estado { get; set; } = true;
    public List<AuditoriaTransaccion> Auditorias { get; set; } = [];
}
