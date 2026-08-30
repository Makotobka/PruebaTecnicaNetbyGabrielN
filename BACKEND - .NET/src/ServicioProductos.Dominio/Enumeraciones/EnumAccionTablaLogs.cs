using System;
using System.ComponentModel;

namespace ServicioProductos.Dominio.Enumeraciones
{
    public enum EnumAccionTablaLogs
    {
        [Description("I")]
        Crear = 1,
        [Description("U")]
        Actualizar = 2,
        [Description("D")]
        Eliminar = 3,
        [Description("D")]
        Activar = 3
    }

    public static class GetEnumAccionTablaLogs
    {
        public static string ToDescriptionString(this EnumAccionTablaLogs val)
        {
            DescriptionAttribute[] attributes = (DescriptionAttribute[])val
               .GetType()
               .GetField(val.ToString())
               .GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes.Length > 0 ? attributes[0].Description : string.Empty;
        }
    }
}
