
using back_end.Models;
using System.Data.Common;

public interface ISQLRepository
{
    public ResRepository<string> TestConnection(string? connString);
    public ResRepository<IEnumerable<string>> GetTablesListName(string? connString);
    public ResRepository<IEnumerable<InfoTables>> GetInfoTables(string? connString, string tableName);
    public ResRepository<IEnumerable<QueyData<object>>> ExecuteQueries(string? connString, IEnumerable<string> arrayQuery);
}
