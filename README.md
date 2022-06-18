# Database-management-system

docker run --name postgresql -e POSTGRES_USER=myusername -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres


```json
{
  "host": "localhost",
  "user": "myusername",
  "dbName": "postgres",
  "password": "mypassword",
  "port": "5432"
}
```
