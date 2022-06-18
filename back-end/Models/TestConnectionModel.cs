using System.ComponentModel.DataAnnotations;
using System.Data.Common;

namespace back_end.Models
{
    public class TestConnectionModel
    {
        internal TestConnectionModel(DbConnection conn)
        {
            Message = conn.DataSource;
        }
        internal TestConnectionModel(bool error, string message)
        {
            Error = error;
            Message = message;
        }
        internal bool Error { get; set; }
        public string Message { get; set; }
    }
}