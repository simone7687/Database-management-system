# Database-management-system

## Connesione WebApi 
### Back-end
Il Back-end approvano solo la connesione da:
- [http://localhost:3000](http://localhost:3000)
- [https://database-management-syst-614c1.web.app](https://database-management-syst-614c1.web.app)

Questo è possibile modificarlo da [qui](/back-end/Program.cs#L12).
### Front-end
Il Front-end invece di default si connette all url: [https://localhost:7119](https://localhost:7119)

Questo è possibile modificarlo da qui.

## Postgresql Docker
```docker
docker run --name postgresql -e POSTGRES_USER=myusername -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```
```json
{
  "host": "localhost",
  "user": "myusername",
  "dbName": "postgres",
  "password": "mypassword",
  "port": "5432"
}
```
