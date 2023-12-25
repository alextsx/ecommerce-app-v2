import { ProductCard } from '@/components/card/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { TabsContent } from '@/components/ui/tabs';
import { useGetRelatedProductsQuery } from '@/redux/product/product.api.slice';

export const RelatedProducts = ({ slug }: { slug: string }) => {
  const { data: products, isLoading, isError } = useGetRelatedProductsQuery(slug);
  return (
    <TabsContent value="related-products" className="space-y-4">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something went wrong</div>}
      {products && (
        <Carousel className="w-full ">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.slug} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <ProductCard key={product.slug} product={product} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </TabsContent>
  );
};
