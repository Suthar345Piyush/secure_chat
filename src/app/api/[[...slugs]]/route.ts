import { redis } from '@/lib/redis';
import {Elysia , t } from 'elysia';
import { nanoid } from 'nanoid';


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

})

const app = new Elysia({prefix : "/api"}).use(rooms);



export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof app;

