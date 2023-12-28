import { useState } from 'react';
import { Field, FormikProps } from 'formik';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/shadcn-utils';
import { useGetCategoriesQuery } from '@/redux/categories/categories.api.slice';

export const ProductForm = ({
  formik,
  disabled
}: {
  formik: FormikProps<any>;
  disabled: boolean;
}) => {
  const { touched, errors, values, setFieldValue } = formik;
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [open, setOpen] = useState(false);

  const onCategorySelect = (categorySlug: string) => {
    setFieldValue('category', categorySlug);
    setOpen(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="name">Name</Label>
        <Field
          as={Input}
          name="name"
          disabled={disabled}
          placeholder="Product name"
          error={touched.name && errors.name}
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Field
          as={Input}
          name="price"
          disabled={disabled}
          placeholder="Product price"
          error={touched.price && errors.price}
        />
      </div>
      <div>
        <Label htmlFor="discountedPrice">Discounted Price</Label>
        <Field
          as={Input}
          name="discountedPrice"
          disabled={disabled}
          placeholder="Discounted price"
          error={touched.discountedPrice && errors.discountedPrice}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Field
          as={Input}
          name="description"
          //start the text in the textarea at the top
          //and wrap it to next line if it exceeds the width
          disabled={disabled}
          placeholder="Product description"
          error={touched.description && errors.description}
        />
      </div>
      <div>
        <Label htmlFor="inventory">Inventory</Label>
        <Field
          as={Input}
          name="inventory"
          disabled={disabled}
          placeholder="Inventory"
          error={touched.inventory && errors.inventory}
        />
      </div>
      <div className="flex justify-start gap-4 items-center">
        <Label htmlFor="isFeatured">Is Featured?</Label>
        <Field
          as={Checkbox}
          name="isFeatured"
          onCheckedChange={() => setFieldValue('isFeatured', !values.isFeatured)}
          checked={values.isFeatured}
          disabled={disabled}
        />
      </div>
      <div className="flex gap-4 items-center">
        <Label htmlFor="category">Category</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {values.category
                ? categories?.find((category) => category.slug === values.category)?.name
                : 'Select a category...'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandEmpty>No categories found.</CommandEmpty>
              <CommandGroup className="max-h-[200px] overflow-y-scroll overflow-x-hidden mb-0">
                {categories?.map((category) => (
                  <CommandItem
                    key={category.slug}
                    value={category.slug}
                    onSelect={onCategorySelect}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        values.category === category.slug ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
