using System.ComponentModel.DataAnnotations;
using System.Net;

namespace back_end.Models
{
    public class HttpResponse<T> : HttpResponseMessage
    {
        public HttpResponse(HttpStatusCode statusCode)
        {
            StatusCode = statusCode;
            Messages = "Status " + statusCode;
        }
        public HttpResponse(HttpStatusCode statusCode, string messages, T? content)
        {
            StatusCode = statusCode;
            Messages = messages;
            Content = content;
        }
        public HttpResponse(HttpStatusCode statusCode, string messages, string messagesAlert, T? content)
        {
            StatusCode = statusCode;
            Messages = messages;
            MessagesAlert = messagesAlert;
            Content = content;
        }
        public HttpResponse(HttpStatusCode statusCode, string messages)
        {
            StatusCode = statusCode;
            Messages = messages;
        }
        public new T? Content { get; set; }
        public string Messages { get; set; }
        public string? MessagesAlert { get; set; }
    }
}