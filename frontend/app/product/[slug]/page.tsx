import { IconStar } from '@/components/icon/IconStar';
import { ProductContent } from '@/components/page-specific/product/ProductContent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const IndividualProduct = ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <div className="py-10 max-w-6xl space-y-8">
      <ProductContent slug={slug} />
      <div className="border border-gray-200 bg-background dark:border-gray-800 rounded-lg">
        <div className="flex gap-4 px-4 py-2">
          <button className="text-lg font-medium px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-800">
            Reviews
          </button>
          <button className="text-lg font-medium px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md">
            Related Products
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={''} alt="avatar" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Reviewer Name</CardTitle>
                  <CardDescription>10 days ago</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <IconStar className="w-5 h-5 fill-primary" />
                <IconStar className="w-5 h-5 fill-primary" />
                <IconStar className="w-5 h-5 fill-primary" />
                <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis mi ac eros
            semper, in pharetra arcu laoreet. Curabitur purus sem, faucibus id consectetur ac,
            aliquam eu lacus.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={''} alt="avatar" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Reviewer Name</CardTitle>
                  <CardDescription>2 weeks ago</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <IconStar className="w-5 h-5 fill-primary" />
                <IconStar className="w-5 h-5 fill-primary" />
                <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis mi ac eros
            semper, in pharetra arcu laoreet. Curabitur purus sem, faucibus id consectetur ac,
            aliquam eu lacus.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndividualProduct;
