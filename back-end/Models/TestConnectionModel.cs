using System.ComponentModel.DataAnnotations;
using System.Data.Common;

namespace back_end.Models
{
    public class TestConnectionModel
    {
        internal TestConnectionModel(DbConnection conn)
        {
            Message = conn.DataSource;
            ConnectionString = conn.ConnectionString;
        }
        internal TestConnectionModel(bool error, string message, string connectionString)
        {
            Error = error;
            Message = message;
            ConnectionString = connectionString;
        }
        internal bool Error { get; set; }
        public string Message { get; set; }
        public string ConnectionString { get; set; }
    }
}