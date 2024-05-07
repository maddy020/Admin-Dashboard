export interface tokenrequest {
  id: number;
  user: {
    username: string;
  };
  userId: number;
  requested_tokens: number;
  status: string;
  createdAt: string;
}
