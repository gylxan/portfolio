import type { SanityImage } from "types/image";

export interface Project {
  name: string;
  description: string;
  private: boolean;
  previewUrl?: string;
  githubUrl?: string;
  keywords: string[];
  backgroundImage?: SanityImage;
}
