namespace ServicioTransacciones.Dominio.Entidades;

public enum TipoTransaccion { Compra, Venta }

public class TransaccionInventario
{
    public Guid? Id { get; set; }
    public Guid IdProducto { get; set; }
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    public string Tipo { get; set; } = string.Empty;
    public int Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal PrecioTotal => Cantidad * PrecioUnitario;
    public string? Detalle { get; set; }
    public bool Estado { get; set; } = true;
    public List<AuditoriaTransaccion> Auditorias { get; set; } = [];
}


public class TransaccionInventarioProducto : TransaccionInventario
{
    public string Nombre { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string? UrlImagen { get; set; }
    public int Stock { get; set; }
}
