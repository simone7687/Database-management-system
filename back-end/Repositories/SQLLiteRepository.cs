using back_end.Models;
using Dapper;
using Microsoft.Data.Sqlite;

public class SQLLiteRepository : ISQLRepository
{
    private readonly ILogger<SQLLiteRepository> _logger;

    public SQLLiteRepository(ILogger<SQLLiteRepository> logger)
    {
        _logger = logger;
    }

    public string BuiltConnectionString(SQLLiteCredentialsModel credentials)
    {
        try
        {
            var builder = new SqliteConnectionStringBuilder
            {
                DataSource = credentials.Path?.Replace("\\", "/"),
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
            using (var conn = new SqliteConnection(connString))
            {
                _logger.LogTrace("TestConnection SQLLiteRepository");
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
            using (var conn = new SqliteConnection(connString))
            {
                _logger.LogTrace("GetTableListName SQLLiteRepository");
                conn.Open();
                string sQuery = @"SELECT name FROM sqlite_schema
                                WHERE type='table'
                                ORDER BY name";
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
            using (var conn = new SqliteConnection(connString))
            {
                _logger.LogTrace("GetInfoTables SQLLiteRepository");
                conn.Open();
                string sQuery = @"select
                                name  as Name,
                                '" + tableName + @"' as TableName,
                                cid as Id,
                                type as Type,
                                IIF([notnull] < 1, 1, 0 ) as Nullable,
                                pk as PrimaryKey
                                FROM pragma_table_info('" + tableName + @"') 
                                JOIN (SELECT COUNT(*) FROM " + tableName + @")";
                string sQueryIndex = @"SELECT name  as Name,
                                '" + tableName + @"' as TableName,
                                type as Type,
                                IIF(type = 'index', 1, 0 ) as 'Index'
                                FROM sqlite_master 
                                WHERE tbl_name = '" + tableName + @"' and type = 'index'";
                string sQueryForeignKey = @"select 
                                '" + tableName + @"' as TableName,
                                'ForeignKey' as Type,
                                [table] as ForeignTable,
                                1 AS ForeignKey,
                                [to] as Name
                                FROM pragma_foreign_key_list('" + tableName + @"')";
                var res = conn.QueryAsync<InfoTables>(sQuery).Result;
                var resIndex = conn.QueryAsync<InfoTables>(sQueryIndex).Result;
                var resForeignKey = conn.QueryAsync<InfoTables>(sQueryForeignKey).Result;
                res = res.Union(resIndex);
                res = resForeignKey.Union(res);

                var i = 0;
                var array = res.ToArray();
                foreach (var item in res)
                {
                    item.Id = i;
                    array[i]=item;
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
            using (var conn = new SqliteConnection(connString))
            {
                _logger.LogTrace("ExecuteQueries SQLLiteRepository");
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
                            if (resQuery < 0)
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
