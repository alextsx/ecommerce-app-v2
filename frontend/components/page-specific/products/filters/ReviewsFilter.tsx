import Link from 'next/link';
import { IconStar } from '@/components/icon/IconStar';

export const ReviewsFilter = () => {
  return (
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
  );
};
