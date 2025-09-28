import 'dotenv/config'
import express, {Application, Request, Response} from 'express';

import appRouter from './application/routes/app-router'



const PORT:number = Number(process.env.PORT);

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