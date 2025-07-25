"use client";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 text-sm font-medium border rounded-md ${
            currentPage === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}