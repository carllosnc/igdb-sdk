export interface IGDBBase {
  id: number;
  checksum?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface IGDBImage {
  alpha_channel?: boolean;
  animated?: boolean;
  height?: number;
  image_id?: string;
  url?: string;
  width?: number;
}

export type IGDBDateTime = string;
export type IGDBTimestamp = number;
