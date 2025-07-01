import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 pt-12 pb-8">
      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand & Summary */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Systech Consultancy Logo"
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
            <li><Link to="/" className="hover:text-white transition">Study in Germany</Link></li>
            <li><Link to="/counselling" className="hover:text-white transition">Individual Counselling</Link></li>
            <li><Link to="/counselling" className="hover:text-white transition">Group Counselling</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <span className="text-white">Email:</span>{' '}
              <a href="mailto:contact@systechconsultancy.in" className="hover:text-white transition">
                contact@systechconsultancy.in
              </a>
            </li>
            <li>
              <span className="text-white">Phone 1:</span>{' '}
              <a href="tel:+919390330592" className="hover:text-white transition">
                +91 9390330592
              </a>
            </li>
            <li>
              <span className="text-white">Phone 2:</span>{' '}
              <a href="tel:+918096343600" className="hover:text-white transition">
                +91 8096343600
              </a>
            </li>
            <li><span className="text-white">Support Hours:</span> Mon–Sun, 10AM – 6PM IST</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Connect With Us</h3>
          <div className="flex gap-4 text-gray-400">
            {/* Replace hrefs with actual links when available */}
            <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="Instagram">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="YouTube">
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-3">Launching soon on major platforms.</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Systech Consultancy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
