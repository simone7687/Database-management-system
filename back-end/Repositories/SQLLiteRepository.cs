using back_end.Models;
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
                DataSource = credentials.Path,
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
        throw new NotImplementedException();
    }

    public ResRepository<IEnumerable<InfoTables>> GetInfoTables(string? connString, string tableName)
    {
        throw new NotImplementedException();
    }

    public ResRepository<IEnumerable<QueyData<object>>> ExecuteQueries(string? connString, IEnumerable<string> arrayQuery)
    {
        throw new NotImplementedException();
    }
}
