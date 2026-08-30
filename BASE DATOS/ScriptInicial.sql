
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = N'Dbo')
    EXEC(N'CREATE SCHEMA Dbo');
GO

CREATE TABLE Dbo.Producto
(
    Id      UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Producto PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Nombre          NVARCHAR(150) NOT NULL,
    Descripcion     NVARCHAR(1000) NULL,
    Categoria       NVARCHAR(100) NOT NULL,
    UrlImagen       NVARCHAR(2048) NULL,
    PrecioUnitario  DECIMAL(18, 2) NOT NULL,
    Stock           INT NOT NULL CONSTRAINT DF_Producto_Stock DEFAULT (0),
    Estado			BIT NOT NULL CONSTRAINT DF_Producto_EstaActivo DEFAULT (1),
);
GO

CREATE TABLE Dbo.Transacciones
(
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Transacciones PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    IdProducto              UNIQUEIDENTIFIER NOT NULL,
    FechaTransaccion        DATETIME2(0) NOT NULL CONSTRAINT DF_Transacciones_Fecha DEFAULT SYSUTCDATETIME(),
    TipoTransaccion         VARCHAR(10) NOT NULL,
    Cantidad                INT NOT NULL,
    PrecioUnitario          DECIMAL(18, 2) NOT NULL,
    PrecioTotal             AS CONVERT(DECIMAL(18, 2), Cantidad * PrecioUnitario) PERSISTED,
    Detalle                 NVARCHAR(1000) NULL,
    Estado					BIT NOT NULL CONSTRAINT DF_Transacciones_EstaEliminada DEFAULT (1),
    CONSTRAINT FK_Transacciones_Producto FOREIGN KEY (IdProducto) REFERENCES Dbo.Producto(Id),
);
GO

CREATE TABLE Dbo.AuditoriaProducto
(
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_AuditoriaProducto PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    IdProducto          UNIQUEIDENTIFIER NOT NULL,
    Accion              CHAR(1) NOT NULL,
    FechaCambioUtc      DATETIME2(0) NOT NULL CONSTRAINT DF_AuditoriaProducto_FechaCambioUtc DEFAULT SYSUTCDATETIME(),
    UsuarioCambio       NVARCHAR(128) NOT NULL,
    ValoresAnteriores   NVARCHAR(MAX) NULL,
    ValoresNuevos       NVARCHAR(MAX) NULL,
    CONSTRAINT FK_AuditoriaProducto_Producto
        FOREIGN KEY (IdProducto) REFERENCES Dbo.Producto(Id),
);
GO

CREATE TABLE Dbo.AuditoriaTransacciones
(
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_AuditoriaTransacciones PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    IdTransacciones          UNIQUEIDENTIFIER NOT NULL,
    Accion                           CHAR(1) NOT NULL,
    FechaCambioUtc                   DATETIME2(0) NOT NULL CONSTRAINT DF_AuditoriaTransacciones_FechaCambioUtc DEFAULT SYSUTCDATETIME(),
    UsuarioCambio                    NVARCHAR(128) NOT NULL,
    ValoresAnteriores                NVARCHAR(MAX) NULL,
    ValoresNuevos                    NVARCHAR(MAX) NULL,
    CONSTRAINT FK_AuditoriaTransacciones_Transacciones
        FOREIGN KEY (IdTransacciones)
        REFERENCES Dbo.Transacciones(Id),
);
GO
