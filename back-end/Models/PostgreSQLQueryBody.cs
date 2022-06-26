namespace back_end.Models
{
    public class PostgreSQLQueryBody : PostgreSQLCredentialsModel
    {
        public string? Query { get; set; }
    }
}
