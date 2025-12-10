//using realtime from upstash 


import { InferRealtimeEvents, Realtime } from "@upstash/realtime";
import {z} from "zod";
import { redis } from "./redis";


const schema = {
   chat : {
     message : z.object({
        id : z.string(),
        token : z.string().optional(),
        sender : z.string(),
        text : z.string(),
        timestamp : z.number(),
        roomId : z.string(),
     }),

     destroy : z.object({
       isDestroyed : z.literal(true),
     }),
   },
};


   // this is realtime instance 

export const realtime = new Realtime({schema , redis});

export type RealtimeEvents = InferRealtimeEvents<typeof realtime>



