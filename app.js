//const express = requiere ("express")
import express from 'express';
//Leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 2008

app.get("/", (_, res) => {
  res.send('Aprendiendo express, ficha 3407181, ADSO en el SENA 31 julio');
});

//otro endpoint

app.listen(port, () => { 
    console.log( `Servidor en funcionamiento en el puerto: ${port}`); 
});