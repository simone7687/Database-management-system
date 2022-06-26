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
                _logger.LogTrace("GetInfoTables PostgreSQLRepository");
                conn.Open();
                string sQuery = @"select
                                c.column_name  as Name,
                                c.is_nullable = 'YES' as Nullable,
                                c.data_type  as type,
                                c.table_name as TableName,
                                tco.constraint_type = 'PRIMARY KEY' as PrimaryKey,
                                tco.constraint_type = 'FOREIGN KEY' as ForeignKey,
                                tco.constraint_type = 'UNIQUE' as Index,
                                ccu.table_name AS ForeignTable,
                                ccu.column_name AS ForeignColumn,
                                row_number() over(order by c.column_name) as Id
                                FROM information_schema.columns c
                                full join information_schema.key_column_usage kcu on c.column_name = kcu.column_name and kcu.table_name = @TableName
                                left join information_schema.table_constraints tco on kcu.constraint_name = tco.constraint_name and kcu.constraint_schema = tco.constraint_schema and kcu.constraint_name = tco.constraint_name
                                left JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = kcu.constraint_name
                                WHERE c.table_name = @TableName
                                ORDER BY c.column_name";
                var res = conn.QueryAsync<InfoTables>(sQuery, param: new { TableName = tableName }).Result;
                return new ResRepository<IEnumerable<InfoTables>>(conn.DataSource, res);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            return new ResRepository<IEnumerable<InfoTables>>(true, ex.Message, default);
        }
    }

    public ResRepository<IEnumerable<QueyData<object>>> ExecuteQueries(string? connString, string[] arrayQuery)
    {
        List<QueyData<object>> res = new List<QueyData<object>>();
        try
        {
            using (var conn = new NpgsqlConnection(connString))
            {
                _logger.LogTrace("ExecuteQueries PostgreSQLRepository");
                conn.Open();
                var numberQueryExecuted = 0;
                foreach (string sQuery in arrayQuery)
                {
                    if (string.IsNullOrWhiteSpace(sQuery))
                    {
                        continue;
                    }
                    try
                    {
                        if (sQuery.ToLower().Contains("select"))
                        {
                            var resQuery = conn.QueryAsync<object>(sQuery).Result;
                            res.Add(new QueyData<object>(resQuery, "Rows Read: " + resQuery.Count()));
                        }
                        else
                        {
                            var resQuery = conn.Execute(sQuery);
                            if (resQuery<0)
                            {
                                res.Add(new QueyData<object>($"Query executed", true));
                            }
                            else
                            {
                                res.Add(new QueyData<object>($"Affected Rows: {resQuery}", true));
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(Constants.UNHANDLED_ERROR, ex);
                        res.Add(new QueyData<object>(ex.Message, false));
                    }
                    numberQueryExecuted++;
                }
                return new ResRepository<IEnumerable<QueyData<object>>>(conn.DataSource, res);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            return new ResRepository<IEnumerable<QueyData<object>>>(true, ex.Message, default);
        }
    }
}
