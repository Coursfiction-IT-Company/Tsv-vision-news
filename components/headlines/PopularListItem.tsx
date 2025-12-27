"use client";
import Link from "next/link";

interface PopularItem {
  _id: string;
  title: string;
}

interface PopularListItemProps {
  item: PopularItem;
}

const PopularListItem: React.FC<PopularListItemProps> = ({ item }) => {
  return (
    <Link
      href={`/news/${item._id}`}
      className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50 transition"
    >
      <p className="flex-1 font-solaiman font-normal text-[18px] leading-[1.1] line-clamp-2 hover:text-blue-600">
        {item.title}
      </p>
    </Link>
  );
};

export default PopularListItem;
