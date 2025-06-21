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
            Guiding students to pursue higher education in Germany, offering language courses and real-world skill development for a future-ready career.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Our Services</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/services#germany" className="hover:text-white transition">Study in Germany</a></li>
            <li><a href="/services#projects" className="hover:text-white transition">Real-World Projects</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><span className="text-white">Email:</span> info@systechconsultancy.in</li>
            <li><span className="text-white">Phone:</span> +91 99999 99999</li>
            <li><span className="text-white">Support:</span> Mon–Sat, 9AM–7PM (WhatsApp)</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Connect With Us</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">YouTube</a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Systech Consultancy. All rights reserved.
      </div>
      
    </footer>
  );
};

export default Footer;
