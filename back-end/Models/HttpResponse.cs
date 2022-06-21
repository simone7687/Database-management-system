using System.ComponentModel.DataAnnotations;
using System.Net;

public class HttpResponse : HttpResponseMessage
{
    public HttpResponse(HttpStatusCode statusCode)
    { 
        StatusCode = statusCode;
    }
    public HttpResponse(HttpStatusCode statusCode, string messages, object? content)
    { 
        StatusCode = statusCode;
        Messages = messages;
        Content = content;
    }
    public new object? Content { get; set; }
    public string Messages { get; set; }
}