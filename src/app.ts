import express, {Application, Request, Response} from 'express';


const PORT:number = 5000;

const app:Application = express();

app.use(express.json());


app.use("/", (request:Request, response:Response)=>{
    response.json({
        ok: true,
        message: "vamos bien!!!"
    })

})



app.listen(PORT, ()=>{
    console.log(`Maldito genio el servidor esta corriendo por el puesto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})