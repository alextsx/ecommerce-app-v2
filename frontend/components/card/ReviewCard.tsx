import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductRating } from '../ProductRating';

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

type Review = {
  rating: number;
  body: string;
  createdAt: string;
  user: User;
};

type ReviewCardProps = {
  review: Review;
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={''} alt="avatar" />
              <AvatarFallback>{review.user.firstName[0] + review.user.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{review.user.firstName + ' ' + review.user.lastName}</CardTitle>
              <CardDescription>{new Date(review.createdAt).toLocaleDateString()}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <ProductRating rating={review.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>{review.body}</CardContent>
    </Card>
  );
};
