import { format } from 'date-fns';
import Link from 'next/link';
import { CalendarDaysIcon, ClockIcon, CurrencyRupeeIcon, UserIcon, UsersIcon, TagIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

// --- Data Fetching & SEO ---
async function getWorkshopBySlug(slug) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workshops/${slug}`, { next: { revalidate: 600 } });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Failed to fetch workshop:", error);
        return null;
    }
}

export async function generateMetadata(props) {
    const params = await props.params;
    const slug = params.slug;
    const workshop = await getWorkshopBySlug(slug);
    if (!workshop) return { title: 'Workshop Not Found' };
    return {
        title: workshop.title,
        description: workshop.description.substring(0, 160),
    };
}

// --- The Main Page Component ---
export default async function WorkshopDetailPage(props) {
    const params = await props.params;
    const slug = params.slug;
    const workshop = await getWorkshopBySlug(slug);

    if (!workshop) {
        return <WorkshopNotFound />;
    }

    const { title, date, time, thumbnailUrl, mentor, fee, duration, description, tags, maxParticipants, perks } = workshop;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Header */}
                <div className="mb-6">
                    <div className="mb-3">
                        <NotFoundIcon/>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            WORKSHOP
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        {title}
                    </h1>
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-sm rounded-md border"
                                >
                                    <TagIcon className="w-3 h-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-2">
                        <div className="lg:bg-white rounded-lg lg:shadow-sm lg:border p-2">
                            {/* Workshop Image - Hidden on mobile */}
                            <div className="aspect-[16/9] h-44 lg:h-full lg:w-full bg-gray-100 relative rounded-lg overflow-hidden">
                                <Image
                                    src={thumbnailUrl || '/default-banner.png'}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Description */}
                            <div className='p-2'>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    About This Workshop
                                </h2>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Workshop Details & Registration */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-4">

                            {/* Additional Info Card */}
                            {perks && perks.length > 0 && (
                                <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                                    <h4 className="font-semibold text-green-900 text-sm mb-2">Workshop Perks</h4>
                                    <ul className="text-green-800 text-xs space-y-1">
                                        {perks.map((perk, index) => (
                                            <li key={index}>• {perk}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Workshop Details Card */}
                            <div className="lg:bg-white rounded-lg lg:shadow-sm lg:border p-5">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Workshop Details
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <UserIcon className="w-4 h-4" />
                                            <span className="text-sm">Mentor</span>
                                        </div>
                                        <span className="font-medium text-gray-900 text-sm">{mentor}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <CalendarDaysIcon className="w-4 h-4" />
                                            <span className="text-sm">Date</span>
                                        </div>
                                        <span className="font-medium text-gray-900 text-sm">
                                            {format(new Date(date), 'dd MMM yyyy')}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <ClockIcon className="w-4 h-4" />
                                            <span className="text-sm">Time</span>
                                        </div>
                                        <span className="font-medium text-gray-900 text-sm">
                                            {new Date(`1970-01-01T${time}Z`).toLocaleTimeString('en-IN', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <UsersIcon className="w-4 h-4" />
                                            <span className="text-sm">Capacity</span>
                                        </div>
                                        <span className="font-medium text-gray-900 text-sm">
                                            {maxParticipants} seats
                                        </span>
                                    </div>

                                    {duration && (
                                        <div className="flex items-center justify-between py-2 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <ClockIcon className="w-4 h-4" />
                                                <span className="text-sm">Duration</span>
                                            </div>
                                            <span className="font-medium text-gray-900 text-sm">
                                                {duration} hours
                                            </span>
                                        </div>
                                    )}

                                    <Link href={`/workshops/${slug}/register`}>
                                        <span className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mb-3">
                                            Register Now
                                        </span>
                                    </Link>

                                    <p className="text-xs text-gray-500 text-center">
                                        Secure your spot today
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Helper Components ---
function WorkshopNotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md mx-auto text-center">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Workshop Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        Sorry, we couldn't find the workshop you were looking for.
                    </p>
                    <Link href="/workshops" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Workshops
                    </Link>
                </div>
            </div>
        </div>
    );
}
