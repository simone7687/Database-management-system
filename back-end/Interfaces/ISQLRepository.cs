
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

public interface ISQLRepository
{
    public ResRepository<string> TestConnection(DbContext dbContext);
    public ResRepository<IEnumerable<string>> GetTablesListName(DbContext dbContext);
    public ResRepository<IEnumerable<InfoTables>> GetInfoTables(DbContext dbContext, string tableName);
    public ResRepository<IEnumerable<QueyData<object>>> ExecuteQueries(DbContext dbContext, IEnumerable<string> arrayQuery);
}
