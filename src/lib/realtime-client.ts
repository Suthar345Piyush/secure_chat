// creating useRealtime hook for client components 

import { createRealtime } from "@upstash/realtime/client";
import type { RealtimeEvents } from "./realtime";

export const {useRealtime} = createRealtime<RealtimeEvents>();



