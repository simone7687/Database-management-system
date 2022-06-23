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

    public ResRepository<string[]> GetTableListName(string? connString)
    {
        try
        {
            using (var conn = new NpgsqlConnection(connString))
            {
                _logger.LogTrace("GetTableListName PostgreSQLRepository");
                conn.Open();
                string sQuery = @"SELECT table_name
                                FROM information_schema.tables
                                WHERE table_schema='public'
                                AND table_type='BASE TABLE'";
                var res = conn.QueryFirstOrDefaultAsync<string[]>(sQuery).Result;
                return new ResRepository<string[]>(conn.DataSource, res);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            return new ResRepository<string[]>(true, ex.Message, default);
        }
    }
}
