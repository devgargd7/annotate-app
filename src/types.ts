export interface Image {
  id: string;
  url: string;
}

export interface QueryImage {
  id: string;
  url: string;
}

export interface AnnotationResult {
  imageId: string;
  relevant: boolean;
  rank: number | null;
}

export interface SavedResult {
  userName: string;
  taskName: string;
  queryImageId: string;
  timestamp: string;
  annotations: AnnotationResult[];
} 