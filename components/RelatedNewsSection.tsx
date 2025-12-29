"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { INews } from "@/types/news";
import { useGetNewsQuery } from "@/app/redux/features/news/newsApi";

interface RelatedNewsSectionProps {
  category: string;
  currentNewsId: string;
}

const RelatedNewsSection: React.FC<RelatedNewsSectionProps> = ({
  category,
  currentNewsId,
}) => {
  // Call RTK Query
  const { data, isLoading, isError } = useGetNewsQuery({ category, limit: 15 });

  // Filter out current news
  const relatedNews: INews[] =
    data?.data?.filter((news) => news._id !== currentNewsId) || [];

  if (isLoading)
    return <p className="text-center py-6 text-gray-500">লোড হচ্ছে...</p>;
  if (isError)
    return (
      <p className="text-center py-6 text-red-500">ত্রুটি হয়েছে</p>
    );
  if (!relatedNews.length) return null;

  return (
    <section className="mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">আরও খবর</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedNews.map((news) => (
            <Link
              key={news._id}
              href={`/news/${news._id}`}
              className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-40 lg:h-48">
                <Image
                  src={news.imageSrc || "/placeholder.png"}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {news.title}
                </h3>
                {news.summary && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {news.summary}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedNewsSection;
