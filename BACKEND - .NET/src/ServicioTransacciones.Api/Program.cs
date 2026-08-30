using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ServicioTransacciones.Aplicacion.Servicios;
using ServicioTransacciones.Dominio.Contratos;
using ServicioTransacciones.Infraestructura.Persistencia;
using ServicioTransacciones.Infraestructura.Repositorios;
using ServicioTransaccionesAplicacion = ServicioTransacciones.Aplicacion.Servicios.ServicioTransacciones;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddCors(opciones => opciones.AddPolicy("PermitirAngular", politica => politica
    .WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opciones => opciones.SwaggerDoc("v1", new OpenApiInfo
{
    Title = "Servicio de Transacciones",
    Version = "v1",
    Description = "API para el registro y consulta de movimientos de inventario."
}));
builder.Services.AddDbContext<ContextoTransacciones>(opciones => opciones.UseSqlServer(builder.Configuration.GetConnectionString("Transacciones")));
builder.Services.AddScoped<IRepositorioTransacciones, RepositorioTransacciones>();
builder.Services.AddScoped<ServicioTransaccionesAplicacion>();
var aplicacion = builder.Build();
if (aplicacion.Environment.IsDevelopment())
{
    aplicacion.UseSwagger();
    aplicacion.UseSwaggerUI(opciones => opciones.SwaggerEndpoint("/swagger/v1/swagger.json", "Servicio de Transacciones v1"));
}
aplicacion.UseHttpsRedirection();
aplicacion.UseCors("PermitirAngular");
aplicacion.MapControllers();
aplicacion.Run();
