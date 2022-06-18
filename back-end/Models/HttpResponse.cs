using System.ComponentModel.DataAnnotations;
using System.Net;

public class HttpResponse : HttpResponseMessage
{
    public HttpResponse(HttpStatusCode statusCode)
    { 
        StatusCode = statusCode;
    }
    public HttpResponse(HttpStatusCode statusCode, Object? values)
    { 
        StatusCode = statusCode;
        Values = values;
    }
    public Object? Values { get; set; }
}