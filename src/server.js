import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from 'dotenv';

const app = fastify();

dotenv.config();

app.register(cors, {
    origin: '*'
})

app.listen({ port: process.env.PORT || 3000 }).then(() => {

    console.log('Server running on PORT:  ' +  process.env.PORT)
})
