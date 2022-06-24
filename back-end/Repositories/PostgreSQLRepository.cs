using back_end.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data.Common;

public class PostgreSQLRepository : ISQLRepository
{
    private readonly ILogger<PostgreSQLRepository> _logger;

    public PostgreSQLRepository(ILogger<PostgreSQLRepository> logger)
    {
        _logger = logger;
    }

    public ResRepository<string> TestConnection(string? connString)
    {
        try
        {
            using (var conn = new NpgsqlConnection(connString))
            {
                _logger.LogTrace("TestConnection PostgreSQLRepository");
                conn.Open();
                return new ResRepository<string>(conn.DataSource, conn.ConnectionString);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            return new ResRepository<string>(true, ex.Message, connString);
        }
    }

    public ResRepository<IEnumerable<string>> GetTableListName(string? connString)
    {
        try
        {
            using (var conn = new NpgsqlConnection(connString))
            {
                _logger.LogTrace("GetTableListName PostgreSQLRepository");
                conn.Open();
                string sQuery = @"SELECT table_name AS TableName
                                FROM information_schema.tables
                                WHERE table_type='BASE TABLE'
                                ORDER BY table_name";
                var res = conn.QueryAsync<string>(sQuery).Result;
                return new ResRepository<IEnumerable<string>>(conn.DataSource, res);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            return new ResRepository<IEnumerable<string>>(true, ex.Message, default);
        }
    }
}
