using System.ComponentModel.DataAnnotations;
using System.Net;

public class InfoTables
{
    public string? Name { get; set; }
    public string? Type { get; set; }
    public bool Nullable { get; set; }
    public bool PrimaryKey { get; set; }
    public bool Index { get; set; }
    public bool ForeignKey { get; set; }
}