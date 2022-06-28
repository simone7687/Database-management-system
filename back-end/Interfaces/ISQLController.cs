
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;

public interface ISQLController<T, T2>
{
    [HttpPut("Connect")]
    public HttpResponse<string> Connect(T credentials);
    [HttpPost("GetTablesListName")]
    public HttpResponse<IEnumerable<string>> GetTablesListName(T credentials);
    [HttpPost("GetInfoTables")]
    public HttpResponse<IEnumerable<InfoTables>> GetInfoTables([FromBody] T credentials, string tableName);
    [HttpPost("ExecuteQueries")]
    public HttpResponse<IEnumerable<QueyData<object>>> ExecuteQueries([FromBody] T2 credentials);
}
