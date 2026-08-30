using Microsoft.EntityFrameworkCore;
using ServicioProductos.Dominio.Entidades;

namespace ServicioProductos.Infraestructura.Persistencia;

public sealed class ContextoProductos(DbContextOptions<ContextoProductos> options) : DbContext(options)
{
    public DbSet<Producto> Productos => Set<Producto>();
    public DbSet<AuditoriaProducto> AuditoriasProductos => Set<AuditoriaProducto>();

    protected override void OnModelCreating(ModelBuilder modelo)
    {
        modelo.Entity<Producto>(entidad =>
        {
            entidad.ToTable("Producto", "Dbo");
            entidad.HasKey(producto => producto.Id);
            entidad.Property(producto => producto.Nombre).HasMaxLength(150).IsRequired();
            entidad.Property(producto => producto.Categoria).HasMaxLength(100).IsRequired();
            entidad.Property(producto => producto.PrecioUnitario).HasPrecision(18, 2);
            entidad.Property(producto => producto.Descripcion).HasMaxLength(1000);
            entidad.Property(producto => producto.UrlImagen).HasMaxLength(2048);
            entidad.HasMany(producto => producto.Auditorias)
                .WithOne()
                .HasForeignKey(auditoria => auditoria.IdProducto);
        });

        modelo.Entity<AuditoriaProducto>(entidad =>
        {
            entidad.ToTable("AuditoriaProducto", "Dbo");
            entidad.HasKey(auditoria => auditoria.Id);
            entidad.Property(auditoria => auditoria.Accion).HasMaxLength(1).IsFixedLength().IsRequired();
            entidad.Property(auditoria => auditoria.UsuarioCambio).HasMaxLength(128).IsRequired();
            entidad.Property(auditoria => auditoria.ValoresAnteriores).HasColumnType("nvarchar(max)");
            entidad.Property(auditoria => auditoria.ValoresNuevos).HasColumnType("nvarchar(max)");
        });
    }
}
