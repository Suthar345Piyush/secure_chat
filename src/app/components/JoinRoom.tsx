// component for join room using room id  (client component)

"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"


//function for join room 

export default function JoinRoom() {

    const [roomId , setRoomId] = useState("");
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("");

    const router = useRouter();


    // handle function for the joining room 

    const handleJoinRoom = async () => {
        
      // validation on start 
      if(!roomId.trim())  {
         setError("Please enter the roomId to join a room");
         return;
      }

      // reducing roomId 

      const reduceRoomId = roomId.trim().toLowerCase();

      // validating the room id 

      if(!/^[a-z0-9-]+$/.test(reduceRoomId)){
        setError("Invalid room id format");
        return;
      }

      setLoading(true);
      setError("");


      try {

           //verifying room exist or not and it's capacity as well 

           const response = await fetch("/api/room/verify" , {
             method : "POST",
             headers : {'Content-Type': 'application/json'},
             body : JSON.stringify({roomId : reduceRoomId})
           });


           const data = await response.json();

           //checks  

           if(!response.ok) {
             setError(data.error || "Failed to join room");
             setLoading(false);
             return;
           }

           //redirecting to room 

           router.push(`/room/${reduceRoomId}`);

      } catch (error) {

         setError("Network error. Please try again");
         setLoading(false);
      }
    };

} 