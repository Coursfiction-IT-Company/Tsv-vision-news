"use client";
import React, { useState } from "react";
import {
  useGetAdsQuery,
  useDeleteAdMutation,
} from "@/app/redux/features/ads/adsApi";
import { Ad } from "@/types/ads";

interface AdsListProps {
  setSelectedAd: (ad: Ad) => void;
}

export default function AdsList({ setSelectedAd }: AdsListProps) {
  const { data, isLoading, isError } = useGetAdsQuery();
  const [deleteAd, { isLoading: isDeleting }] = useDeleteAdMutation();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const adsArray: Ad[] = data?.ads || [];

  if (isLoading) return <p>Loading...</p>;
  if (isError || adsArray.length === 0) return <p>No ads found.</p>;

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => [...prev, id]);
    try {
      await deleteAd(id).unwrap(); // unwrap to catch errors
    } catch (err) {
      console.error("Failed to delete ad:", err);
    } finally {
      setDeletingIds((prev) => prev.filter((adId) => adId !== id));
    }
  };

  return (
    <div className="p-6 space-y-4">
      {adsArray.map((ad) => {
        const isAdDeleting = deletingIds.includes(ad._id!);

        return (
          <div
            key={ad._id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white shadow rounded space-y-3 sm:space-y-0 sm:space-x-4"
          >
            {/* Image */}
            <div className="flex-shrink-0 w-full sm:w-32 h-24 sm:h-24 overflow-hidden rounded">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h3 className="font-bold text-lg">{ad.title}</h3>
              <p className="text-blue-600 underline break-all">{ad.link}</p>
              <p className="text-gray-500">{ad.position}</p>
              <p className="text-gray-400 text-sm">
                Active: {new Date(ad.startDate).toLocaleDateString()} -{" "}
                {new Date(ad.endDate).toLocaleDateString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedAd(ad)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(ad._id!)}
                disabled={isAdDeleting}
                className={`px-4 py-2 rounded ${
                  isAdDeleting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isAdDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
