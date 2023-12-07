import { CategoryFilter } from './CategoryFilter';
import { NameFilter } from './NameFilter';
import { PriceFilter } from './PriceFilter';
import { ReviewsFilter } from './ReviewsFilter';

export const ProductsFilters = () => {
  return (
    <aside className="h-full px-10 py-5 bg-primary-foreground/80 border rounded-md gap-10 flex flex-col">
      <NameFilter />
      <CategoryFilter />
      <PriceFilter />
      <ReviewsFilter />
    </aside>
  );
};
