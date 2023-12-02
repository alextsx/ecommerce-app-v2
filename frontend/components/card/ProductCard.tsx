import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function ProductCard() {
  const product = {
    name: 'Sample Product',
    description: 'This is a sample product description.',
    price: '$99.99'
  };

  const imageWidth = 320;
  const imageHeight = 240;

  return (
    <div className="w-80 h-[400px] border-2 group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 relative">
      <div className="h-3/5 relative">
        <Image
          className="object-cover"
          src={`https://loremflickr.com/${imageWidth}/${imageHeight}`}
          alt={product.name}
          layout="fill"
        />
      </div>
      <div className="absolute bottom-0 w-full xl:h-2/5 h-3/5 bg-primary-foreground p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold overflow-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal cursor-default">
            {product.name}
          </h2>
          <p className="text-sm">{product.price}</p>
          <Separator className="w-80 relative -left-4 mt-2" />
        </div>
        <div className="relative top-1 transform w-full h-full">
          <p className="absolute left-0 text-sm mt-2 text-left h-full group-hover:hidden hidden xl:inline">
            {product.description}
          </p>
          <div className="absolute w-full h-full top-4 left-0 xl:opacity-0 opacity-100  justify-between flex-col group-hover:opacity-100 transition-opacity duration-200 xl:flex xl:justify-between xl:flex-row">
            <Button variant="outline">View Product</Button>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
