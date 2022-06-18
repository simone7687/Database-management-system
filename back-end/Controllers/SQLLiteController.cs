using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route("[controller]")]
public class SQLLiteController : ControllerBase, ISQLController<SQLLiteCredentialsModel>
{
    private readonly ILogger<SQLLiteController> _logger;
    private readonly SQLLiteRepository _repository;

    public SQLLiteController(ILogger<SQLLiteController> logger, SQLLiteRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    [HttpPut("Connect")]
    public HttpResponse Connect(SQLLiteCredentialsModel credentials)
    {
        var conn = _repository.TestConnection(credentials.Path);
        if (conn.Error)
        {
            return new HttpResponse(HttpStatusCode.ServiceUnavailable, conn);
        }
        return new HttpResponse(HttpStatusCode.OK, conn);
    }
}
