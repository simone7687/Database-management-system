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

    public ResRepository<IEnumerable<string>> GetTablesListName(string? connString)
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

    public ResRepository<IEnumerable<InfoTables>> GetInfoTables(string? connString, string tableName)
    {
        try
        {
            using (var conn = new NpgsqlConnection(connString))
            {
                _logger.LogTrace("GetTableListName PostgreSQLRepository");
                conn.Open();
                string sQuery = @"select c.column_name  as Name,
                                c.is_nullable = 'YES' as Nullable,
                                c.data_type  as type,
                                tco.constraint_type = 'PRIMARY KEY' as PrimaryKey,
                                tco.constraint_type = 'FOREIGN KEY' as ForeignKey,
                                tco.constraint_type = 'UNIQUE' as Index,
                                row_number() over(order by c.column_name) as Id
                                FROM information_schema.columns c
                                left join information_schema.key_column_usage kcu on c.column_name = kcu.column_name
                                left join information_schema.table_constraints tco 
                                on kcu.constraint_name = tco.constraint_name
                                and kcu.constraint_schema = tco.constraint_schema
                                and kcu.constraint_name = tco.constraint_name
                                WHERE c.table_name   = @TableName
                                ORDER BY c.column_name";
                var res = conn.QueryAsync<InfoTables>(sQuery, param: new { TableName= tableName }).Result;
                return new ResRepository<IEnumerable<InfoTables>>(conn.DataSource, res);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            return new ResRepository<IEnumerable<InfoTables>>(true, ex.Message, default);
        }
    }
}
