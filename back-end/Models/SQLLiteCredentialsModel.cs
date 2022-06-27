using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class SQLLiteCredentialsModel
    {
        [Required]
        public string? Path { get; set; }
        public string? Password { get; set; }
    }
}