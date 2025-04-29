export interface User {
  id: number;
  fullName: string;
  avatar: Avatar;
  email?: string;
  department?: string;
  microsoftId: string;
  role: string;
  updatedAt: number[];
  createdAt: number[];
}

export interface Avatar {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  publicId: string;
  uploadedAt: number[] | null;
  url: string;
}
