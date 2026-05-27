import type { IGDBBase, IGDBImage, IGDBDateTime } from "./base.js";

export interface Event extends IGDBBase {
  description?: string;
  end_time?: IGDBDateTime;
  event_logo?: number;
  event_networks?: number[];
  games?: number[];
  live_stream_url?: string;
  name?: string;
  slug?: string;
  start_time?: IGDBDateTime;
  time_zone?: string;
  videos?: number[];
}

export interface EventLogo extends IGDBBase, IGDBImage {
  event?: number;
}

export interface EventNetwork extends IGDBBase {
  event?: number;
  network_type?: number;
  url?: string;
}
