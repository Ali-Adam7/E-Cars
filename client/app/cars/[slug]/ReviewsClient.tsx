"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { postReview } from "@/fetchHelper/catalog";
import toast, { Toaster } from "react-hot-toast";
export default function ReviewClient({ car }: any) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const Router = useRouter();

  const post = async () => {
    // Post Review
    if (rating && reviewText) {
      const review = {
        review: reviewText,
        rating: rating,
        carID: car.id,
        userID: user.id,
        time: new Date(),
      };
      await postReview(review, car.id);
      toast.success("Review Posted");
      Router.refresh();
      setOpen(false);
    } else toast.error("Add a review and rating");
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <div className="rating mb-10">
          <input
            type="radio"
            name="rating-2"
            className=" mask mask-star-2 bg-orange-400"
            onClick={(val) => setRating(1)}
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            onClick={(val) => setRating(2)}
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            onClick={(val) => setRating(3)}
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            onClick={(val) => setRating(4)}
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            onClick={(val) => setRating(5)}
          />
        </div>
        <div>
          <div className="border-b border-gray-200 focus-within:border-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              onChange={(val) => setReviewText(val.target.value)}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              defaultValue={""}
            />
          </div>

          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5">
              <div className="flow-root"></div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={post}
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
