import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              PetNest
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              Connecting loving pets with caring families.
              Find your perfect companion and give a pet a forever home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/all-pets" className="hover:text-primary">
                  All Pets
                </Link>
              </li>

              <li>
                <Link href="/dashboard/add-pet" className="hover:text-primary">
                  Add Pet
                </Link>
              </li>

              <li>
                <Link href="/dashboard/my-requests" className="hover:text-primary">
                  My Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Contact Us
            </h3>

            <ul className="space-y-2 text-sm">
              <li>📧 support@petnest.com</li>
              <li>📞 +880 1611630055</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                Facebook
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500"
              >
                Twitter
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                Instagram
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PetNest. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}