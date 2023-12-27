import { ProductsFilters } from '@/components/page-specific/products/filters/ProductsFilters';
import { ProductCardsSection } from '@/components/page-specific/products/ProductCardsSection';
import { ProductsSortBySelector } from '@/components/page-specific/products/SortBySelector';

const ProductsListingPage = () => {
  return (
    <section className="w-full relative px-28 py-10">
      <div className="flex flex-row justify-between">
        <h1 className="ml-2 text-2xl font-bold">
          <span className="font-thin">Home</span> / Search
        </h1>
        <ProductsSortBySelector className="relative ml-auto mr-2 mb-10" />
      </div>
      <div className="flex flex-row items-start w-full justify-center gap-20">
        <ProductsFilters />
        <div className="w-full">
          <ProductCardsSection />
        </div>
      </div>
    </section>
  );
};
export default ProductsListingPage;
