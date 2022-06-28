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

    public string BuiltConnectionString(PostgreSQLCredentialsModel credentials)
    {
        try
        {
            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = credentials.Host,
                Username = credentials.User,
                Database = credentials.DBname,
                Port = string.IsNullOrEmpty(credentials.Port) ? 5432 : int.Parse(credentials.Port),
                Password = credentials.Password
            };
            return builder.ConnectionString;
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            throw;
        }
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
                                c.table_name as TableName
                                FROM information_schema.columns c
                                WHERE c.table_name = @TableName
                                ORDER BY c.column_name";
                string sQueryKey = @"select
                                tco.constraint_type = 'PRIMARY KEY' as PrimaryKey,
                                tco.constraint_type = 'FOREIGN KEY' as ForeignKey,
                                tco.constraint_type = 'UNIQUE' as Index
                                FROM  information_schema.key_column_usage kcu
                                left join information_schema.table_constraints tco on kcu.constraint_name = tco.constraint_name and kcu.constraint_schema = tco.constraint_schema and kcu.constraint_name = tco.constraint_name
                                left JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = kcu.constraint_name
                                WHERE kcu.table_name = @TableName";
                var res = conn.QueryAsync<InfoTables>(sQuery, param: new { TableName = tableName }).Result;
                var resKey = conn.QueryAsync<InfoTables>(sQueryKey, param: new { TableName = tableName }).Result;
                res = res.Union(resKey);

                var i = 0;
                var array = res.ToArray();
                foreach (var item in res)
                {
                    item.Id = i;
                    array[i] = item;
                    i++;
                }
                return new ResRepository<IEnumerable<InfoTables>>(conn.DataSource, res);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(Constants.UNHANDLED_ERROR, ex);
            return new ResRepository<IEnumerable<InfoTables>>(true, ex.Message, default);
        }
    }

    public ResRepository<IEnumerable<QueyData<object>>> ExecuteQueries(string? connString, IEnumerable<string> arrayQuery)
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
                        if (sQuery.ToLower().StartsWith("select"))
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
