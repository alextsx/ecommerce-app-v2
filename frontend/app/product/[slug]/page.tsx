import { HTMLAttributes, PropsWithChildren } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Component() {
  const test = '&quot;';
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="max-w-6xl w-full space-y-8">
        <div className="bg-background px-20 py-10 border rounded-lg grid md:grid-cols-2 gap-4">
          <div className="flex flex-col items-start space-y-4">
            <Image
              alt="Product Image"
              className="aspect-square object-cover border border-gray-200 w-3/4 rounded-lg overflow-hidden dark:border-gray-800"
              height={400}
              src="https://picsum.photos/400"
              width={400}
            />
            <span>{test}</span>
            <div className="grid grid-cols-3 gap-2 w-3/4">
              <Image
                alt="Product Image thumbnail"
                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                height={200}
                src="https://picsum.photos/200"
                width={200}
              />
              <Image
                alt="Product Image thumbnail"
                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                height={200}
                src="https://picsum.photos/200"
                width={200}
              />
              <Image
                alt="Product Image thumbnail"
                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                height={200}
                src="https://picsum.photos/200"
                width={200}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="font-bold text-3xl">Product Name</h1>
                <div className="text-5xl font-bold">$99</div>
              </div>
              <div className="flex flex-col items-start justify-center gap-4">
                <div className="flex items-center gap-0.5">
                  <IconStar className="w-5 h-5 fill-primary" />
                  <IconStar className="w-5 h-5 fill-primary" />
                  <IconStar className="w-5 h-5 fill-primary" />
                  <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <Badge className="w-auto h-auto text-md">Category</Badge>
              </div>
            </div>
            <p className="text-gray-500">
              Product description lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              sagittis mi ac eros semper, in pharetra arcu laoreet.
            </p>
            <Button className="relative text-lg" size="lg">
              <FaShoppingCart className="w-5 h-5 absolute right-4 top-3" />
              Add to Cart
            </Button>
          </div>
        </div>
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
    </div>
  );
}

const IconStar = ({ className }: HTMLAttributes<SVGElement>) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};
