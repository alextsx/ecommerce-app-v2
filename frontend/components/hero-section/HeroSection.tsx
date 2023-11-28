import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="flex flex-col items-start gap-2 px-4 pt-8 md:pt-12 pb-8">
      <Link
        className="inline-flex items-center border rounded-lg px-3 py-1 text-sm font-medium"
        href="/new-arrivals"
      >
        🎉
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border w-[1px] mx-2 h-4"
        ></div>
        <span className="sm:hidden">New arrivals are here!</span>
        <span className="hidden sm:inline">Check out our latest arrivals!</span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-1 h-4 w-4"
        >
          <path
            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Link>
      <h1 className="text-3xl mt-3 font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Welcome to Our Online Store.
      </h1>
      <span
        className="mt-3 max-w-[650px] text-lg text-muted-foreground sm:text-xl break-normal"
        data-br=":r6i:"
      >
        Discover a wide range of products at unbeatable prices. Shop now and enjoy fast delivery,
        secure payments, and excellent customer service.
      </span>
    </section>
  );
};
