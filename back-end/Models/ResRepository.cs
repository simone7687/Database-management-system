using System.ComponentModel.DataAnnotations;
using System.Data.Common;

namespace back_end.Models
{
    public class ResRepository<T>
    {
        internal ResRepository(string message, T content)
        {
            Message = message;
            Content = content;
        }
        internal ResRepository(bool error, string message, T? content)
        {
            Error = error;
            Message = message;
            Content = content;
        }
        internal bool Error { get; set; }
        public string Message { get; set; }
        public T? Content { get; set; }
    }
}