using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route("[controller]")]
public class PostgreSQLController : ControllerBase
{
    private readonly ILogger<PostgreSQLController> _logger;
    private readonly PostgreSQLRepository _postgreSQLRepository;

    public PostgreSQLController(ILogger<PostgreSQLController> logger, PostgreSQLRepository postgreSQLRepository)
    {
        _logger = logger;
        _postgreSQLRepository = postgreSQLRepository;
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

        var conn = _postgreSQLRepository.TestConnection(connString);
        if (conn.Error)
        {
            return new HttpResponse(HttpStatusCode.ServiceUnavailable, conn);
        }
        return new HttpResponse(HttpStatusCode.OK, conn);
    }
}
