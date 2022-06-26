using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class PostgreSQLQueryBody : PostgreSQLCredentialsModel
    {
        [Required]
        public string? Query { get; set; }
    }
}
