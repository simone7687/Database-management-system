# Database management system
Il progetto è stato realizzato usando ASP.NET Core & React. 

La soluzione è divisa in due progetti:
### Back-end

Implementa una web app e delle API. 
La documentazione per le API è presente all’indirizzo /swagger.
Composta da:
- Controllers: contiene i controller per le API e delle classi contenenti i metodi esposti dalle API.
- Repositories: usate per scrivere e leggere dati dal database (utilizza Dapper per mappare i dati).
- (Ho preferito non aggiungere un Service intermediario tra Controllers e Repositories)


### Front-end
Implementa l'interfaccia è stata realizzata attraverso React con interfaccia MUI (https://mui.com/) e 
silicizzazioni Typescript.

# Settaggi per la Connessione WebApi 
## Back-end
Il Back-end approva solo la connesione da:
- [http://localhost:3000](http://localhost:3000)
- [https://database-management-syst-614c1.web.app](https://database-management-syst-614c1.web.app)

Questo è possibile modificarlo da [qui](/back-end/Program.cs#L12).
### Front-end
Il Front-end invece di default si connette all url: [https://localhost:7119](https://localhost:7119)

Questo è possibile modificarlo da [qui](/reactinferface/.env#L1).

# Istruzioni
## Aggiungere un Database e conoscere le sue Informazioni
![image](https://user-images.githubusercontent.com/49060178/176276573-24d9dae1-79d2-4fae-91e0-89ec7dc1eb22.png)

Per collegare un database basta cliccare il '+' nella barra laterale sinistra, ed chiudere la connessione con la 
'x'.

Durante la connessione SQLite in caso in cui il browser non permette la lettura del percorso del file verrà
segnalato all’utente e invogliato e settarlo manualmente.

All’interno della tab del database si può aprire una seconda tab che mostrerà la lista delle tabelle.

Con il pulsante ![image](https://user-images.githubusercontent.com/49060178/176268984-6fef5638-ea58-4244-b18c-389642ad51c6.png) si può aprire una finestra che mostrerà le sue informazioni.


## Per eseguire Statement
![image](https://user-images.githubusercontent.com/49060178/176276967-4b2f0083-fd9b-4f2b-9df6-7dd8ad9f9735.png)

Dopo aver scritto uno o più Statement divise da ';', si deve selezionare il database ed eseguire attraverso il 
pulsante play.

Verrà mostrato il risultato in una finestra sottostante.


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
