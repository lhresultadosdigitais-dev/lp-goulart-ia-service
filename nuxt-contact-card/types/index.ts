export interface ContactForm {
  name: string;
  email: string;
  message: string;
  audioUrl?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}