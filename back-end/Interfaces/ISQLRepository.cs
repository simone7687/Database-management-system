﻿
using back_end.Models;
using System.Data.Common;

public interface ISQLRepository
{
    public ResRepository<string> TestConnection(string? connString);
    public ResRepository<string[]> GetTableListName(string? connString);
}
