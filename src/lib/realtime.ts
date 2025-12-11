//using realtime from upstash 


import { InferRealtimeEvents, Realtime } from "@upstash/realtime";
import {z} from "zod";
import { redis } from "./redis";


const message = z.object({
   id : z.string(),
   sender : z.string(),
   timestamp : z.number(),
   text : z.string(),
   roomId : z.string(),
   token : z.string().optional(),
});


const schema = {
    chat : {
       message,
        destroy : z.object({
           isDestroyed : z.literal(true),
        }),
    },
};


   // this is realtime instance 

export const realtime = new Realtime({schema , redis});

export type RealtimeEvents = InferRealtimeEvents<typeof realtime>

export type Message = z.infer<typeof message>





