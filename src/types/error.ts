export interface ErrorType {
  response: {
    data: {
      timestamp: number[];
      status: number;
      title: string;
      message: string;
    };
  };
}
