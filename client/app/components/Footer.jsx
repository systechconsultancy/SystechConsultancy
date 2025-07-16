import Link from 'next/link';
import Image from 'next/image';
import LinkedInIcon from '../icons/LinkedInIcon';
// import InstagramIcon from './icons/InstagramIcon';
// import YouTubeIcon from './icons/YouTubeIcon';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 pt-12 pb-8">
      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand & Summary */}
        <div>
          {/* Changed to next/link and next/image */}
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="Systech Consultancy Logo"
              width={120}
              height={50}
              className="h-10 w-auto object-contain"
            />
            <div>
              <span className="text-xl font-semibold text-white">Systech Consultancy</span>
              <p className="text-xs text-gray-400 -mt-1">Empowering Your Vision</p>
            </div>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mt-2">
            Guiding students to pursue higher education in Germany through strategic planning,
            skill-building projects, and 1-on-1 mentorship from industry experts.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Our Services</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {/* Changed to next/link with href */}
            <li><Link href="/services" className="hover:text-white transition">All Services</Link></li>
            <li><Link href="/counselling" className="hover:text-white transition">Individual Counselling</Link></li>
            <li><Link href="/counselling" className="hover:text-white transition">Group Counselling</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <span className="font-semibold text-gray-200">Email:</span>{' '}
              <a href="mailto:contact@systechconsultancy.in" className="hover:text-white transition">
                contact@systechconsultancy.in
              </a>
            </li>
            <li>
              <span className="font-semibold text-gray-200">Phone:</span>{' '}
              <a href="tel:+919390330592" className="hover:text-white transition">
                +91 9390330592
              </a>
            </li>
            <li><span className="font-semibold text-gray-200">Support:</span> Mon–Sun, 10AM – 6PM IST</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Connect With Us</h3>
          <div className="flex gap-5 text-gray-400">
            {/* Using SVG Icons and correct external link attributes */}
            <a
              href="https://www.linkedin.com/in/malikireddy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
            </a>
            {/* <a
              href="#" // Add your Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="#" // Add your YouTube URL
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-6 h-6" />
            </a> */}
          </div>
          <p className="text-sm text-gray-400 mt-3">Launching soon on major platforms.</p>
        </div>
      </div>

      {/* Footer Bottom with added legal links */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
        <span>© {new Date().getFullYear()} Systech Consultancy. All rights reserved.</span>
        <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;