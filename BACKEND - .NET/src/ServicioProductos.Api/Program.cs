using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ServicioProductos.Aplicacion.Contratos;
using ServicioProductos.Aplicacion.Servicios;
using ServicioProductos.Dominio.Contratos;
using ServicioProductos.Infraestructura.Persistencia;
using ServicioProductos.Infraestructura.Repositorios;
using ServicioProductosAplicacion = ServicioProductos.Aplicacion.Servicios.ServicioProductos;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opciones => opciones.SwaggerDoc("v1", new OpenApiInfo
{
    Title = "Servicio de Productos",
    Version = "v1",
    Description = "API para la gestión del catálogo y stock de productos."
}));
builder.Services.AddDbContext<ContextoProductos>(opciones => opciones.UseSqlServer(builder.Configuration.GetConnectionString("Productos")));
builder.Services.AddScoped<IRepositorioProductos, RepositorioProductos>();
builder.Services.AddScoped<IServicioProductos, ServicioProductosAplicacion>();
var aplicacion = builder.Build();
if (aplicacion.Environment.IsDevelopment())
{
    aplicacion.UseSwagger();
    aplicacion.UseSwaggerUI(opciones => opciones.SwaggerEndpoint("/swagger/v1/swagger.json", "Servicio de Productos v1"));
}
aplicacion.UseHttpsRedirection();
aplicacion.MapControllers();
aplicacion.Run();
