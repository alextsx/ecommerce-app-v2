export type Review = {
  rating: number;
  body: string;
  createdAt: string;
  user: ReviewUser;
};

type ReviewUser = {
  email: string;
  firstName: string;
  lastName: string;
};

export type ReviewsResponse = PaginationResponse<Review>;
