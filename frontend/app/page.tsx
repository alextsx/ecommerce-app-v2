import { Metadata } from 'next';
import { FeatureCard } from '@/components/card/FeatureCard';
import { ProductCard } from '@/components/card/ProductCard';
import { HeroSection } from '@/components/HeroSection';
import SectionSeparator from '@/components/SectionSeparator';
import { Slider } from '@/components/Slider';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.'
};

export default function Homepage() {
  return (
    <>
      <div className="flex flex-col items-center md:px-20 lg:flex-row w-full">
        <HeroSection />
        <Slider />
      </div>
      <SectionSeparator innerText="Featured Products" />
      <section className="py-20 flex flex-row justify-between w-10/12">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
      <SectionSeparator />
      <div className="w-full xl:pr-12 xl:pl-14 py-10 mt-10 grid justify-items-center grid-cols-1 xl:grid-cols-3 gap-4">
        <FeatureCard title="International Shipping" link="blog" />
        <FeatureCard title="Secure Payment Options" link="http://localhost:8888/test/blog/" />
        <FeatureCard title="24/7 Customer Support" link="about-us" />
      </div>
      <SectionSeparator innerText="Best selling Products" />
      <section className="py-20 flex flex-row justify-between w-10/12">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
      <SectionSeparator innerText="New arrivals" />
      <section className="py-20 flex flex-row justify-between w-10/12">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
      <SectionSeparator innerText="Recommended" />
      <section className="py-20 flex flex-row justify-between w-10/12">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </>
  );
}
