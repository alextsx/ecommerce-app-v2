'use client';

import { FeatureCard } from '@/components/card/FeatureCard';
import { HeroSection } from '@/components/HeroSection';
import { ProductShowcaseSection } from '@/components/page-specific/home/ProductShowcaseSection';
import SectionSeparator from '@/components/SectionSeparator';
import { Slider } from '@/components/Slider';
import {
  useGetBestSellersProductsQuery,
  useGetFeaturedProductsQuery,
  useGetNewArrivalsProductsQuery
} from '@/redux/products/products.api.slice';

export default function Homepage() {
  return (
    <>
      <div className="flex flex-col items-center md:px-20 lg:flex-row w-full py-10">
        <HeroSection />
        <Slider />
      </div>
      <ProductShowcaseSection useQueryHook={useGetFeaturedProductsQuery} sectionName="Featured" />
      <SectionSeparator />
      <div className="w-full xl:pr-12 xl:pl-14 py-10 mt-10 grid justify-items-center grid-cols-1 xl:grid-cols-3 gap-4">
        <FeatureCard title="International Shipping" link="blog" />
        <FeatureCard title="Secure Payment Options" link="http://localhost:8888/test/blog/" />
        <FeatureCard title="24/7 Customer Support" link="about-us" />
      </div>
      <ProductShowcaseSection
        useQueryHook={useGetNewArrivalsProductsQuery}
        sectionName="New arrivals"
      />
      <ProductShowcaseSection
        useQueryHook={useGetBestSellersProductsQuery}
        sectionName="Best Sellers"
      />
      <ProductShowcaseSection useQueryHook={useGetFeaturedProductsQuery} sectionName="Featured" />

      {/* need top rated */}
    </>
  );
}
