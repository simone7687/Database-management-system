
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;

public interface ISQLController<T>
{
    [HttpPut("Connect")]
    public HttpResponse<string> Connect(T credentials);
    [HttpPost("GetTablesListName")]
    public HttpResponse<IEnumerable<string>> GetTablesListName(T credentials);
    [HttpPost("GetInfoTables")]
    public HttpResponse<IEnumerable<InfoTables>> GetInfoTables([FromBody] PostgreSQLCredentialsModel credentials, string tableName);
    [HttpPost("ExecuteQueries")]
    public HttpResponse<IEnumerable<QueyData<object>>> ExecuteQueries([FromBody] PostgreSQLCredentialsModel credentials, string query);
}
