import Link from 'next/link';

export const CategoryFilter = () => {
  return (
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
  );
};
