export const PriceFilter = () => {
  return (
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
  );
};
