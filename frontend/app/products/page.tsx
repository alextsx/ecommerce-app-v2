import Link from 'next/link';
import { ProductCard } from '@/components/card/ProductCard';
import { IconStar } from '@/components/icon/IconStar';
import { ProductsSortBySelector } from '@/components/page-specific/products/SortBySelector';

const ProductsListingPage = () => {
  return (
    <section className="w-full relative px-28">
      <div className="flex flex-row justify-between">
        <h1 className="ml-2 text-2xl font-bold">
          <span className="font-thin">Home</span> / Search
        </h1>
        <ProductsSortBySelector className="relative ml-auto mr-2 mb-10" />
      </div>
      <div className="flex flex-row items-start w-full justify-center gap-20">
        <aside className="h-full px-10 py-5 bg-primary-foreground/80 border rounded-md gap-10 flex flex-col">
          <div>
            <h2 className="text-lg font-semibold mb-2">Product name</h2>
            <input
              aria-label="Search"
              className="w-full py-2 px-3 border border-gray-300 rounded-md bg-primary-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search..."
              type="text"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Categories</h3>
            <ul className="list-disc list-inside">
              <li>
                <Link className="text-sm font-mono hover:underline" href="#">
                  Electronics
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline font-mono" href="#">
                  Fashion
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline font-mono" href="#">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline font-mono" href="#">
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Price</h3>
            <div className="flex justify-around gap-2 items-center">
              <span>$1</span>
              <input
                aria-label="Price range slider"
                className="slider w-full"
                max="5"
                min="1"
                type="range"
              />
              <span>$5</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Reviews</h3>
            <div className="flex flex-col">
              {[5, 4, 3, 2, 1].map((elem) => (
                <Link href="#" key={elem} className="flex items-center">
                  {Array.from({ length: elem }).map((_, j) => (
                    <IconStar key={j} className="w-4 h-4 fill-current text-yellow-500 mr-1" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">({elem})</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
        <div className="grid grid-cols-3 gap-y-10 gap-x-8 justify-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
};
export default ProductsListingPage;
