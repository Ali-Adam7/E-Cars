import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function Pagination(props: {
  maxPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const { currentPage, setCurrentPage, maxPages } = props;
  const pagesAtOnce = 5;
  const [numbersArray, setNumberArray] = useState<number[]>([...Array(maxPages).keys()]);
  const [firstIndex, setFirstIndex] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState<number>(Math.min(pagesAtOnce, maxPages));
  const HandlePages = () => {
    if (pagesAtOnce < maxPages && currentPage >= lastIndex) {
      setFirstIndex(currentPage);
      setLastIndex(Math.min(lastIndex + 5, currentPage + pagesAtOnce));
      return;
    } else if (currentPage < firstIndex) {
      setFirstIndex(Math.max(firstIndex - pagesAtOnce, 0));
      setLastIndex(currentPage + 1);
    }
  };
  useEffect(() => {
    HandlePages();
  }, [currentPage]);

  useEffect(() => {
    setNumberArray([...Array(maxPages).keys()]);
    setLastIndex(Math.min(pagesAtOnce, maxPages));
  }, [maxPages]);

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => {
            if (currentPage > 0) setCurrentPage(currentPage - 1);
          }}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {numbersArray.slice(firstIndex, lastIndex).map(
          (page: number) =>
            page != maxPages && (
              <button
                onClick={() => setCurrentPage(page)}
                key={page}
                className={
                  currentPage == page
                    ? "inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                    : "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
              >
                {page + 1}
              </button>
            )
        )}
        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}

        <>
          {maxPages - lastIndex > 0 && (
            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
              ...
            </span>
          )}
          <button
            disabled={maxPages - lastIndex > 1}
            onClick={() => setCurrentPage(maxPages)}
            className={
              currentPage == maxPages
                ? "inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                : "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }
          >
            {maxPages + 1}
          </button>
        </>
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => {
            if (currentPage < maxPages) setCurrentPage(currentPage + 1);
          }}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
