using System.ComponentModel.DataAnnotations;
using System.Net;

namespace back_end.Models
{
    public class QueyData<T>
    {
        public QueyData(T? data, string? message)
        {
            Data = data;
            Message = message;
            IsSuccessStatusCode = true;
        }
        public QueyData(string? message, bool isSuccessStatusCode)
        {
            Message = message;
            IsSuccessStatusCode = isSuccessStatusCode;
        }
        public T? Data { get; set; }
        public bool IsSuccessStatusCode { get; }
        public string? Message { get; set; }
    }
}