
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;

public interface ISQLController<T>
{
    [HttpPut("Connect")]
    public HttpResponse Connect(T credentials);
    public HttpResponse GetTablesListName(T credentials);
}
