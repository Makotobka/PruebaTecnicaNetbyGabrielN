# PruebaTecnicaNetbyGabrielN
Prueba técnica para aspiración de bancate en netby

# FRONT ANGULAR
- Se esta usando angular 14, con node 16.20.2 para el frontend
- npm i. para instalar modulos necesarios (Ejecutar solo con node 16.20.2).
- ng serve (para levantar el front en el puerto 4200).
- Se aplico angular materia sin profundizar en estilos personalizados.
- La urls de los ambientes es: http://localhost:4200
- Se utilizan complementos como: Angular Material, ngx-datatable y Flex Layout.

# BACKEND .NET CORE
- Misma solucion se encuentra los 2 microservicios, cada uno se levanta por separados.
- Las urls de los ambientes son:
	- Productos: https://localhost:7237/swagger
	- Transacciones: https://localhost:7081/swagger
- Se utilizan complementos como: EF Core SQL Server, Swagger


# SQL
- Existe un script inicial para levantar la base de datos y los triggers automaticos.
- Se creo un triggers automatico para reducciòn o aumento de stock de productos.