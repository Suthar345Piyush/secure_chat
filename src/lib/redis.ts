//for valid redis connection 

import { Redis } from "@upstash/redis";


//this will take the env credentials and establish connection b/w app and redis  

export const redis  = Redis.fromEnv();
