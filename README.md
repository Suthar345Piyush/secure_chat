A simple , secure realtime chat application , built using latest Nextjs-16 , using realtime chat functionality , room can be made and user can join the room using a code provided by other user , all chat's are private and room exist only for 10 minutes , all the chat/messages are automatically destroyed after room expires , user can destroy room on their own , used upstash(realtime) for realtime chat instead of websockets.

Tech-Stack:

1. Nextjs-16 (Typescript).
2. Upstash/Redis(Realtime) - Used for storing unique roomId for seamless connection between user and realtime used for chat in realtime.
3. ElysiaJs - Used for creating authentication middleware , to authenticate user based on the roomId.
4. Tanstack-Query(React-Query) - Used for fast data fetching.
5. Zod - For schema validation of typescript.
6. NanoId - For generating random roomId's.
7. Date-fns - For formating the timestamps for generated room.
8. TailwindCSS - For styling the app.
