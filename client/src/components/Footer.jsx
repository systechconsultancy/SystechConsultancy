
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                <div>
                    <h2 className="text-2xl font-bold mb-4">YourLogo</h2>
                    <p className="text-sm text-gray-400">
                        We guide students in pursuing higher education in Germany, offer language learning courses, and help them build skills in their respective fields of interest.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Our Services</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="/services#germany" className="hover:text-white">Study in Germany</a></li>
                        <li><a href="/services#projects" className="hover:text-white">Real-World Projects</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li>Email: info@yourdomain.com</li>
                        <li>Phone: +91 9999999999</li>
                        <li>WhatsApp: Mon–Sat, 9AM–7PM</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-gray-300">
                        <a href="#" className="hover:text-white">LinkedIn</a>
                        <a href="#" className="hover:text-white">Facebook</a>
                        <a href="#" className="hover:text-white">Instagram</a>
                        <a href="#" className="hover:text-white">Youtube</a>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
                © {new Date().getFullYear()} Your Consultancy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
