# Database-management-system
Il progetto è stato realizzato usando ASP.NET Core & React. La soluzione è divisa in due progetti:
### Back-end

Implementa una web app e delle API. La documentazione per le API è presente all’indirizzo /swagger.
Composta da:
- Controllers: contiene i controller per le API e delle classi contenenti i metodi esposti dalle API.
- Repositories: ambiente di un sistema informativo, in cui vengono gestiti i metadati, attraverso tabelle relazionali.

### Front-end
Implementa l'intefaccia è stata realizzata attraverso React con interfaccia MUI (https://mui.com/) e tipicizzazion Typescript.

# Settaggi
## Connesione WebApi 
### Back-end
Il Back-end approva solo la connesione da:
- [http://localhost:3000](http://localhost:3000)
- [https://database-management-syst-614c1.web.app](https://database-management-syst-614c1.web.app)

Questo è possibile modificarlo da [qui](/back-end/Program.cs#L12).
### Front-end
Il Front-end invece di default si connette all url: [https://localhost:7119](https://localhost:7119)

Questo è possibile modificarlo da [qui](/reactinferface/.env#L1).

## Aggiungere un DataBase e conoscere le sue Informazioni
![image](https://user-images.githubusercontent.com/49060178/176263869-d5e37cd1-5596-4fbf-9572-c9a76bf66ab9.png)

Per collegare un database basta cliccare il '+' nella barra platerale sinistra, ed chiudere la connesione con la 'x'.
Allinterco della tab del database si può parere una seconda tab che mostrerà la lista delle tabelle.
Con il pulsante ![image](https://user-images.githubusercontent.com/49060178/176268984-6fef5638-ea58-4244-b18c-389642ad51c6.png) si può aprire un finestra che mostrerà le sue informazioni.


## Per eseguire Statement
![image](https://user-images.githubusercontent.com/49060178/176270082-a7189fc8-2434-41a0-bd04-53f0008e298c.png)

Dopo ever stritto la uno o più Statement divise da ';', si deve selezionere il database ed eseguire attraverso il pulsante play.

Verra mostrato il risultato in una vinestra sottostante.


# Database
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
