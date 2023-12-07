export const NameFilter = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Product name</h2>
      <input
        aria-label="Search"
        className="w-full py-2 px-3 border border-gray-300 rounded-md bg-primary-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Search..."
        type="text"
      />
    </div>
  );
};
