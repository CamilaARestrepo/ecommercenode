import 'dotenv/config'
import express, {Application, Request, Response} from 'express';

import appRouter from './application/routes/app-router'
import { dbConnection } from './infraestructura/config/config-db-mongo';



const PORT:number = Number(process.env.PORT);

// DB CONNECTION
dbConnection();

const app:Application = express();

app.use(express.json());

app.use(appRouter);

/*
app.use("/", (request:Request, response:Response)=>{
    response.json({
        ok: true,
        message: "vamos bien!!!"
    })

})
*/



app.listen(PORT, ()=>{
    console.log(`Maldito genio el servidor esta corriendo por el puesto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})