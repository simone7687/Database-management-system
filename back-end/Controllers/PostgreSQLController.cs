using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route("[controller]")]
public class PostgreSQLController : ControllerBase, ISQLController<PostgreSQLCredentialsModel>
{
    private readonly ILogger<PostgreSQLController> _logger;
    private readonly PostgreSQLRepository _repository;

    public PostgreSQLController(ILogger<PostgreSQLController> logger, PostgreSQLRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpPut("Connect")]
    public HttpResponse Connect(PostgreSQLCredentialsModel credentials)
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
            return new HttpResponse(HttpStatusCode.ServiceUnavailable, conn.Message, conn.Content);
        }
        return new HttpResponse(HttpStatusCode.OK, conn.Message, conn.Content);
    }

    [HttpPost("GetTableListName")]
    public HttpResponse GetTableListName(PostgreSQLCredentialsModel credentials)
    {
        string connString = string.Format(
            "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
            credentials.Host,
            credentials.User,
            credentials.DBname,
            credentials.Port,
            credentials.Password
        );

        var conn = _repository.GetTablesListName(connString);
        if (conn.Error)
        {
            return new HttpResponse(HttpStatusCode.ServiceUnavailable, conn.Message, conn.Content);
        }
        return new HttpResponse(HttpStatusCode.OK, conn.Message, conn.Content);
    }

    [HttpPost("GetInfoTables")]
    public HttpResponse GetInfoTables([FromBody] PostgreSQLCredentialsModel credentials, string tableName)
    {
        string connString = string.Format(
            "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
            credentials.Host,
            credentials.User,
            credentials.DBname,
            credentials.Port,
            credentials.Password
        );

        var conn = _repository.GetInfoTables(connString, tableName);
        if (conn.Error)
        {
            return new HttpResponse(HttpStatusCode.ServiceUnavailable, conn.Message, conn.Content);
        }
        return new HttpResponse(HttpStatusCode.OK, conn.Message, conn.Content);
    }
}
