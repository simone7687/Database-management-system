using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route("[controller]")]
public class SQLLiteController : ControllerBase, ISQLController<SQLLiteCredentialsModel, SQLLiteQueryBody>
{
    private readonly ILogger<SQLLiteController> _logger;
    private readonly SQLLiteRepository _repository;

    public SQLLiteController(ILogger<SQLLiteController> logger, SQLLiteRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpPut("Connect")]
    public HttpResponse<string> Connect(SQLLiteCredentialsModel credentials)
    {
        string connString = _repository.BuiltConnectionString(credentials);

        var conn = _repository.TestConnection(connString);
        if (conn.Error)
        {
            return new HttpResponse<string>(HttpStatusCode.ServiceUnavailable, conn.Message, conn.Content);
        }
        return new HttpResponse<string>(HttpStatusCode.OK, conn.Message, conn.Content);
    }

    [HttpPost("GetTablesListName")]
    public HttpResponse<IEnumerable<string>> GetTablesListName(SQLLiteCredentialsModel credentials)
    {
        throw new NotImplementedException();
    }

    [HttpPost("GetInfoTables")]
    public HttpResponse<IEnumerable<InfoTables>> GetInfoTables([FromBody] PostgreSQLCredentialsModel credentials, string tableName)
    {
        throw new NotImplementedException();
    }

    [HttpPost("ExecuteQueries")]
    public HttpResponse<IEnumerable<QueyData<object>>> ExecuteQueries([FromBody] SQLLiteQueryBody credentials)
    {
        throw new NotImplementedException();
    }
}
