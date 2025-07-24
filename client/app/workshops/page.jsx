import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarDaysIcon, ClockIcon, CurrencyRupeeIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid';

// This Server Component fetches data directly
async function getPublicWorkshops() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workshops`, { 
      next: { revalidate: 600 } // Re-fetch data every 10 minutes
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch public workshops:", error);
    return [];
  }
}

export const metadata = {
  title: "Upcoming Workshops",
  description: "Join our expert-led workshops on studying and building a career in Germany. Gain valuable insights and practical skills.",
};

export default async function WorkshopsPage() {
  const workshops = await getPublicWorkshops();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 text-center border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">Upcoming Workshops</h1>
          <p className="text-md text-gray-600 mt-3 max-w-2xl mx-auto">
            Expert-led sessions to give you a competitive edge in your journey to Germany.
          </p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {workshops.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((workshop) => (
                <PublicWorkshopCard key={workshop.slug} workshop={workshop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700">No Upcoming Workshops</h2>
              <p className="text-gray-500 mt-2">Please check back later for our new schedule.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// This is the new, public-facing card component.
function PublicWorkshopCard({ workshop }) {
  const { slug, title, date, thumbnailUrl, mentor, fee, duration } = workshop;

  return (
    // The entire card is a link to the workshop's detail page
    <Link href={`/workshops/${slug}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group transform hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img
            src={thumbnailUrl || '/default-banner.png'} // A fallback image is good practice
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 flex-grow">{title}</h3>
          
          {/* Details */}
          <div className="space-y-2 mt-3 text-sm text-gray-600">
            <div className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
              <span>By {mentor}</span>
            </div>
            <div className="flex items-center">
              <CalendarDaysIcon className="w-4 h-4 mr-2 text-gray-400" />
              <span>{format(new Date(date), 'dd MMM yyyy')}</span>
            </div>
          </div>
          
          {/* Footer of the card */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1 text-lg font-bold text-green-600">
              <CurrencyRupeeIcon className="w-5 h-5" />
              <span>{fee === 0 ? 'Free' : fee}</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">
              Learn More &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}