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
        string connString = string.Format(
            "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
            credentials.Host,
            credentials.User,
            credentials.DBname,
            credentials.Port,
            credentials.Password
        );

        var conn = _repository.TestConnection(connString);
        if (conn.Error)
        {
            return new HttpResponse<string>(HttpStatusCode.ServiceUnavailable, conn.Message, conn.Content);
        }
        return new HttpResponse<string>(HttpStatusCode.OK, conn.Message, conn.Content);
    }

    [HttpPost("GetTablesListName")]
    public HttpResponse<IEnumerable<string>> GetTablesListName(PostgreSQLCredentialsModel credentials)
    {
        string connString = string.Format(
            "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
            credentials.Host,
            credentials.User,
            credentials.DBname,
            credentials.Port,
            credentials.Password
        );

        var data = _repository.GetTablesListName(connString);
        if (data.Error)
        {
            return new HttpResponse<IEnumerable<string>>(HttpStatusCode.ServiceUnavailable, data.Message, data.Content);
        }
        return new HttpResponse<IEnumerable<string>>(HttpStatusCode.OK, data.Message, data.Content);
    }

    [HttpPost("GetInfoTables")]
    public HttpResponse<IEnumerable<InfoTables>> GetInfoTables([FromBody] PostgreSQLCredentialsModel credentials, string tableName)
    {
        string connString = string.Format(
            "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
            credentials.Host,
            credentials.User,
            credentials.DBname,
            credentials.Port,
            credentials.Password
        );

        var data = _repository.GetInfoTables(connString, tableName);
        if (data.Error)
        {
            return new HttpResponse<IEnumerable<InfoTables>>(HttpStatusCode.ServiceUnavailable, data.Message, data.Content);
        }
        return new HttpResponse<IEnumerable<InfoTables>>(HttpStatusCode.OK, data.Message, data.Content);
    }

    [HttpPost("ExecuteQueries")]
    public HttpResponse<IEnumerable<QueyData<object>>> ExecuteQueries([FromBody] PostgreSQLQueryBody credentials)
    {
        string connString = string.Format(
            "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
            credentials.Host,
            credentials.User,
            credentials.DBname,
            credentials.Port,
            credentials.Password
        );
        if (string.IsNullOrWhiteSpace(credentials.Query))
        {
            return new HttpResponse<IEnumerable<QueyData<object>>>(HttpStatusCode.OK, "Query nulla");
        }

        var arrayQuery = _utility.ConvertQueryStringInCleanArray(credentials.Query);
        var data = _repository.ExecuteQueries(connString, arrayQuery);
        if (data.Error)
        {
            return new HttpResponse<IEnumerable<QueyData<object>>>(HttpStatusCode.ServiceUnavailable, data.Message, data.Content);
        }
        return new HttpResponse<IEnumerable<QueyData<object>>>(HttpStatusCode.OK, data.Message, data.Content);
    }
}
