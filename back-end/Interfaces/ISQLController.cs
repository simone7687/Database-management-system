
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;

public interface ISQLController<T>
{
    [HttpPut("Connect")]
    public HttpResponse Connect(T credentials);
    [HttpPost("GetTablesListName")]
    public HttpResponse GetTablesListName(T credentials);
    [HttpPost("GetInfoTables")]
    public HttpResponse GetInfoTables([FromBody] PostgreSQLCredentialsModel credentials, string tableName);
}
