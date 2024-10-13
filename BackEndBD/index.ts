import {connectDatabase} from "./src/persistence/database";
import express from "express";
//import { PersonRepository } from "./repository/person.repository.js";
//import { PersonController } from "./controller/person.controller.js";
//import { TarefaRepository } from "./repository/tarefa.repository.js";
//import { TarefaController } from "./controller/tarefa.controller.js";
//import { StatusRepository } from "./repository/status.repository.js";
//import { StatusController } from "./controller/status.controller.js";
import cors from 'cors';

console.log("💾 Connecting to database");
(async () => {
    try {
        const db = await connectDatabase();
        console.log("Conexão bem-sucedida ao MySQL!");
        await db.end(); // Close the connection when finished
    } catch (error) {
        console.error("Erro ao conectar ao MySQL:", error);
    }
})();

//Por Analisar
//console.log("🏃 Executing migrations");
//await database.migrate(db)

console.log("📚 Initializing repositories")
//const personRepository = new PersonRepository(db)
//const tarefaRepository = new TarefaRepository(db)
//const statusRepository = new StatusRepository(db)

console.log("🚪 Initializing controllers")
/*const personController = new PersonController(
    personRepository,
    tarefaRepository,
    statusRepository
)
const tarefaController = new TarefaController(tarefaRepository, statusRepository)
const statusController = new StatusController(statusRepository)
*/

console.log("🔨 Configuring express")
const api: express.Express = express();
const port: number = 3000;
api.use(express.json());

console.log(" Serving frontend")
api.use(express.static("public"))
api.use(cors());


console.log("🧭 Registering routes")
/* api.get("/person", personController.findPersons())
api.get("/person/:personId", personController.getPerson());
api.post("/person", personController.addPerson())
api.delete("/person/:personId", personController.deletePerson())
api.get("/person/:personId/tarefa", tarefaController.findTarefa())
api.post("/person/:personId/tarefa", tarefaController.addTarefa())
api.delete("/tarefa/:tarefaId", tarefaController.deleteTarefa())
api.put("/tarefa/:tarefaId/:statusId", tarefaController.updateTarefa()) */

console.log("✈️ Starting express");
api.listen(port, () => {
    console.log("💡 Express JS listening on: " + port)
})