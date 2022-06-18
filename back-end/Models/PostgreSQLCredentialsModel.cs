using System.ComponentModel.DataAnnotations;

namespace back_end.Models
{
    public class PostgreSQLCredentialsModel
    {
        [Required]
        public string? Host { get; set; }
        [Required]
        public string? User { get; set; }
        [Required]
        public string? DBname { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? Port { get; set; }
    }
}