using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route("[controller]")]
public class SQLLiteController : ControllerBase, ISQLController<SQLLiteCredentialsModel>
{
    private readonly ILogger<SQLLiteController> _logger;
    private readonly PostgreSQLRepository _postgreSQLRepository;

    public SQLLiteController(ILogger<SQLLiteController> logger, PostgreSQLRepository postgreSQLRepository)
    {
        _logger = logger;
        _postgreSQLRepository = postgreSQLRepository;
    }

    public HttpResponse Connect(SQLLiteCredentialsModel credentials)
    {
        throw new NotImplementedException();
    }
}
