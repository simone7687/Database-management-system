using back_end.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data.Common;

public class Utility
{
    private readonly ILogger<Utility> _logger;

    public Utility(ILogger<Utility> logger)
    {
        _logger = logger;
    }

    public IEnumerable<string> ConvertQueryStringInCleanArray(string? connString, string splitter = ";")
    {
        if (connString == null)
        {
            return Enumerable.Empty<string>();
        }
        var rowList = connString.Split("\n");
        var rowListClean = rowList.Where(query => !(query.StartsWith("--") || string.IsNullOrWhiteSpace(query)));
        var quryStringClean = string.Join(" ", rowListClean);
        var queryList = quryStringClean.Split(splitter);
        var queryListClean = queryList.Where(query => !string.IsNullOrWhiteSpace(query));
        var res = queryListClean.Select(query => query.Trim()).ToList();
        return res;
    }
}
