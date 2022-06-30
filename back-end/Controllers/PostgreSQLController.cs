using back_end.DBContext;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route("[controller]")]
public class PostgreSQLController : ControllerBase, ISQLController<PostgreSQLCredentialsModel, PostgreSQLQueryBody>
{
    private readonly ILogger<PostgreSQLController> _logger;
    private readonly PostgreSQLRepository _repository;
    private readonly Utility _utility;

    public PostgreSQLController(ILogger<PostgreSQLController> logger, PostgreSQLRepository repository, Utility utility)
    {
        _logger = logger;
        _repository = repository;
        _utility = utility;
    }

    [HttpPut("Connect")]
    public HttpResponse<string> Connect(PostgreSQLCredentialsModel credentials)
    {
        var db = new PostgreSQLDbContext(credentials);

        var conn = _repository.TestConnection(db);
        if (conn.Error)
        {
            return new HttpResponse<string>(HttpStatusCode.ServiceUnavailable, conn.Message, conn.Content);
        }
        return new HttpResponse<string>(HttpStatusCode.OK, conn.Message, conn.Content);
    }

    [HttpPost("GetTablesListName")]
    public HttpResponse<IEnumerable<string>> GetTablesListName(PostgreSQLCredentialsModel credentials)
    {
        var db = new PostgreSQLDbContext(credentials);

        var data = _repository.GetTablesListName(db);
        if (data.Error)
        {
            return new HttpResponse<IEnumerable<string>>(HttpStatusCode.ServiceUnavailable, data.Message, data.Content);
        }
        return new HttpResponse<IEnumerable<string>>(HttpStatusCode.OK, data.Message, data.Content);
    }

    [HttpPost("GetInfoTables")]
    public HttpResponse<IEnumerable<InfoTables>> GetInfoTables([FromBody] PostgreSQLCredentialsModel credentials, string tableName)
    {
        var db = new PostgreSQLDbContext(credentials);

        var data = _repository.GetInfoTables(db, tableName);
        if (data.Error)
        {
            return new HttpResponse<IEnumerable<InfoTables>>(HttpStatusCode.ServiceUnavailable, data.Message, data.Content);
        }
        return new HttpResponse<IEnumerable<InfoTables>>(HttpStatusCode.OK, data.Message, data.Content);
    }

    [HttpPost("ExecuteQueries")]
    public HttpResponse<IEnumerable<QueyData<object>>> ExecuteQueries([FromBody] PostgreSQLQueryBody credentials)
    {
        var db = new PostgreSQLDbContext(credentials);

        if (string.IsNullOrWhiteSpace(credentials.Query))
        {
            return new HttpResponse<IEnumerable<QueyData<object>>>(HttpStatusCode.OK, "Query nulla");
        }

        var arrayQuery = _utility.ConvertQueryStringInCleanArray(credentials.Query);
        var data = _repository.ExecuteQueries(db, arrayQuery);
        if (data.Error)
        {
            return new HttpResponse<IEnumerable<QueyData<object>>>(HttpStatusCode.ServiceUnavailable, data.Message, data.Content);
        }
        return new HttpResponse<IEnumerable<QueyData<object>>>(HttpStatusCode.OK, data.Message, data.Content);
    }
}
