"use client"


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";


export const Providers = ( {children} : {children : React.ReactNode}) => {
  // syntax for the query client in tanstak 
    const [queryClient] = useState(() => new QueryClient());

    return   <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>



  } 