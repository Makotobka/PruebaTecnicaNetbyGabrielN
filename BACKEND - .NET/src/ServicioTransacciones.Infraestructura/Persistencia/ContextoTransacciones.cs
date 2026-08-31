using Microsoft.EntityFrameworkCore;
using ServicioTransacciones.Dominio.Entidades;
namespace ServicioTransacciones.Infraestructura.Persistencia;
public sealed class ContextoTransacciones(DbContextOptions<ContextoTransacciones> options) : DbContext(options)
{
    public DbSet<TransaccionInventario> Transacciones => Set<TransaccionInventario>();
    public DbSet<ProductoConsulta> Productos => Set<ProductoConsulta>();
    public DbSet<AuditoriaTransaccion> AuditoriasTransacciones => Set<AuditoriaTransaccion>();
    protected override void OnModelCreating(ModelBuilder modelo)
    {
        base.OnModelCreating(modelo);

        modelo.Entity<TransaccionInventario>(entidad =>
        {
            entidad.ToTable("Transacciones", "Dbo");
            entidad.HasKey(transaccion => transaccion.Id);
            entidad.Property(transaccion => transaccion.Fecha).HasColumnName("FechaTransaccion");
            entidad.Property(transaccion => transaccion.Tipo).HasColumnName("TipoTransaccion").HasConversion<string>().HasMaxLength(10);
            entidad.Property(transaccion => transaccion.PrecioUnitario).HasPrecision(18, 2);
            entidad.Ignore(transaccion => transaccion.PrecioTotal);
            entidad.HasMany(transaccion => transaccion.Auditorias)
                .WithOne()
                .HasForeignKey(auditoria => auditoria.IdTransacciones);
        });

        modelo.Entity<AuditoriaTransaccion>(entidad =>
        {
            entidad.ToTable("AuditoriaTransacciones", "Dbo");
            entidad.HasKey(auditoria => auditoria.Id);
            entidad.Property(auditoria => auditoria.Accion).HasMaxLength(1).IsFixedLength().IsRequired();
            entidad.Property(auditoria => auditoria.UsuarioCambio).HasMaxLength(128).IsRequired();
            entidad.Property(auditoria => auditoria.ValoresAnteriores).HasColumnType("nvarchar(max)");
            entidad.Property(auditoria => auditoria.ValoresNuevos).HasColumnType("nvarchar(max)");
        });

        modelo.Entity<ProductoConsulta>(entidad =>
        {
            entidad.ToTable("Producto", "Dbo");
            entidad.HasKey(producto => producto.Id);
            entidad.Property(producto => producto.Nombre).HasMaxLength(150);
            entidad.Property(producto => producto.Categoria).HasMaxLength(100);
            entidad.Property(producto => producto.UrlImagen).HasMaxLength(2048);
        });
    }
}
