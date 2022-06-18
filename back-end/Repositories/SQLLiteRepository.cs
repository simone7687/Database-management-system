using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Npgsql;
using System.Data.Common;

public class SQLLiteRepository : ISQLRepository
{
    private readonly ILogger<SQLLiteRepository> _logger;

    public SQLLiteRepository(ILogger<SQLLiteRepository> logger)
    {
        _logger = logger;
    }

    public TestConnectionModel TestConnection(string? connString)
    {
        try
        {
            using (var conn = new SqliteConnection(connString))
            {
                _logger.LogTrace("TestConnection SQLLiteRepository");
                conn.Open();
                return new TestConnectionModel(conn);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            return new TestConnectionModel(true, ex.Message, connString);
        }
    }
}
