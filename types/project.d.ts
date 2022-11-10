export interface Project {
  name: string;
  description: string;
  private: boolean;
  previewUrl?: string;
  githubUrl?: string;
  slugs: string[];
  imageUrl?: string;
  delay?: number;
}
