
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;

public interface ISQLController<SQLLiteCredentialsModel>
{
    [HttpPut("Connect")]
    public HttpResponse Connect(SQLLiteCredentialsModel credentials);
}
