function Footer() {
  return (
    <footer className="bg-black text-aqua-400 py-12">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1
     sm:grid-cols-2 lg:grid-cols-4 
     gap-8 px-4 sm:px-6 lg:px-8"
      >
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="text-white">
            ClipSync is a video messaging platform designed for asynchronous
            communication, particularly in work environments. It allows users to
            quickly create and share videos by recording their screen, webcam,
            or both.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick links</h2>
          <ul>
            <li>
              <a
                href=""
                className="hover:text-aqua transition-colors duration-300 text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href=""
                className="hover:text-aqua transition-colors duration-300 text-white"
              >
               Docs
              </a>
            </li>
            <li>
              <a
                href=""
                className="hover::text-aqua transition-colors duration-300 text-white"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href=""
                className="hover:text-aqua transition-colors duration-300 text-white"
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
              href=""
              className="hover:text-aqua transition-colors duration-300 text-white"
            >
              Github
            </a>
            <a
              href=""
              className="hover:text-aqua transition-colors duration-300 text-white"
            >
              Linkedln
            </a>
            <a
              href=""
              className="hover:text-aqua transition-colors duration-300 text-white"
            >
              Twitter
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-white">Allahabad,India</p>
          <p className="text-white">Allahabd, 211004</p>
          <p className="text-white">Email:clip.sync@2k24@gmail.com</p>
          <p className="text-white">phone: +91 1234567890</p>
        </div>
      </div>
      <p className="text-center mt-10 text-xs">
        &copy; 2024 ClipSync, All right reserved{" "}
      </p>
    </footer>
  );
}

export default Footer;
