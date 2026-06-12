function Footer() {
  return (
    <footer className="bg-black text-neutral-400 py-12 border-t border-neutral-900">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1
     sm:grid-cols-2 lg:grid-cols-4 
     gap-8 px-4 sm:px-6 lg:px-8"
      >
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="text-neutral-300">
            ClipSync is a video messaging platform designed for asynchronous
            communication, particularly in work environments. It allows users to
            quickly create and share videos by recording their screen, webcam,
            or both.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-indigo-400 transition-colors duration-300 text-neutral-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/docs"
                className="hover:text-indigo-400 transition-colors duration-300 text-neutral-300"
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="hover:text-indigo-400 transition-colors duration-300 text-neutral-300"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-indigo-400 transition-colors duration-300 text-neutral-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              className="hover:text-indigo-400 transition-colors duration-300 text-neutral-300"
            >
              Github
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-indigo-400 transition-colors duration-300 text-neutral-300"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-indigo-400 transition-colors duration-300 text-neutral-300"
            >
              Twitter
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-neutral-300">Email: clip.sync.2k24@gmail.com</p>
        </div>
      </div>
      <p className="text-center mt-10 text-xs text-neutral-500">
        &copy; 2024 ClipSync. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
