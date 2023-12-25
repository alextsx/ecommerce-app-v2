import { IconStar } from '@/components/icon/IconStar';
import { ProductContent } from '@/components/page-specific/product/ProductContent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IndividualProduct = ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <div className="py-10 max-w-6xl space-y-8">
      <ProductContent slug={slug} />
      <Tabs defaultValue="reviews">
        <div className="border border-gray-200 p-2 bg-background dark:border-gray-800 rounded-lg">
          <TabsList className="w-[400px] grid p-1 grid-cols-2 h-full">
            <TabsTrigger className="text-lg" value="reviews">
              Reviews
            </TabsTrigger>
            <TabsTrigger className="text-lg" value="related-products">
              Related products
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="reviews" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndividualProduct;
