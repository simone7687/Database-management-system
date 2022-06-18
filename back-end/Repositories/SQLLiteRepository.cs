using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data.Common;

public class SQLLiteRepository : ISQLRepository
{
    private readonly ILogger<SQLLiteRepository> _logger;

    public SQLLiteRepository(ILogger<SQLLiteRepository> logger)
    {
        _logger = logger;
    }

    public TestConnectionModel TestConnection(string connString)
    {
        throw new NotImplementedException();
    }
}
