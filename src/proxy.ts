// this is an middleware file  

import { NextRequest , NextResponse } from "next/server";
import { redis } from "./lib/redis";
import { nanoid } from "nanoid";


export const proxy = async( req : NextRequest ) => {

    const pathname = req.nextUrl.pathname;

    const roomMatch  =  pathname.match(/^\/room\/([^/]+)$/);

    if(!roomMatch) {
       return NextResponse.redirect(new URL("/" , req.url));
    }

    const roomId = roomMatch[1];

    //creating the metadata of the room 

    const meta = await redis.hgetall<{
      connected : string[];
      createdAt : number;
     }>(`meta:${roomId}`);

     if(!meta) {
       return NextResponse.redirect(new URL("/?error=room-not-found" , req.url));
     }


     const existingToken = req.cookies.get("x-auth-token")?.value;


     // checking user allowed to join room or not  

     if(existingToken && meta.connected.includes(existingToken)) {
       return NextResponse.next();
     }

     // when user is not allowed to join room 

     if(meta.connected.length >= 2) {
       return NextResponse.redirect(new URL("/?error=room-full" , req.url));
     }



     const response = NextResponse.next();

     const token = nanoid();

     //creating response on the basis of token 

     response.cookies.set("x-auth-token" , token , {
       path : "/",
       httpOnly : true,
       secure : process.env.NODE_ENV === "production",
       sameSite : "strict",
     });


     await redis.hset(`meta:${roomId}` , {
       connected : [...meta.connected , token],
     });


     return response;

  };


  export const config = {
     matcher : "/room/:path",
  };


  