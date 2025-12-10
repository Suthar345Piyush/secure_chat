import { redis } from '@/lib/redis';
import {Elysia , t } from 'elysia';
import { nanoid } from 'nanoid';
import { authMiddleware } from './auth';
import {z} from "zod"; 


//each room max to max , open for 10 mins 

 const ROOM_TTL_SECONDS = 60 * 10;
   
const rooms = new Elysia({prefix : "/room"}).post("/create" , async () => {

  
   const roomId = nanoid();

    // giving the metadata of the created room 

   await redis.hset(`meta:${roomId}`  , {
      connected : [],
      createdAt : Date.now(),
   });

   //logic for room self destruction,this is provided by redis itself  
 
    // ttl_seconds = time to leave in seconds 

   await redis.expire(`meta:${roomId}` , ROOM_TTL_SECONDS);

   return {roomId};

});


//if user passes the authMiddleware , then it will pass to the next home url 

const messages = new Elysia({prefix : "/messages"}).use(authMiddleware).post("/" , async ({body , auth}) => {
     const {sender , text} = body;

     const {roomId} = auth;

     const roomExists = await redis.exists(`meta:${roomId}`);

     if(!roomExists) {
        throw new Error("Room does not exist");
     }

} , {
    query : z.object({roomId : z.string()}),
    body : z.object({
       sender : z.string().max(100),
       text : z.string().max(1000),
    }),
})



const app = new Elysia({prefix : "/api"}).use(rooms).use(messages);



export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof app;

