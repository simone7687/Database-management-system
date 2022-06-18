
using back_end.Models;
using System.Data.Common;

public interface ISQLRepository
{
    public TestConnectionModel TestConnection(string? connString);
}
