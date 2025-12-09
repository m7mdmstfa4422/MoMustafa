import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="md:ps-20 pb-20 sm:pb-0 border-t border-gray-200 dark:border-slate-800 py-12 px-6 md:px-12 bg-white dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">Mo</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Mohammed Mustafa</h4>
              <p className="text-sm text-gray-500 dark:text-slate-400">Front‑End Developer · UI enthusiast</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-slate-400">
            Crafted with attention to detail — modern, responsive interfaces that feel delightful.
          </p>

          <div className="flex items-center gap-3">

            <a
              href="mailto:mohammedmustafaibrahim02@gmail.com"
              className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Contact
            </a>

            <span className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

            <a
              href="https://wa.me/201003154481"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-green-600 dark:text-green-500 hover:text-cyan-500"
            >
              {/* WhatsApp Icon */}
              <svg
                className="w-4 h-4"
                viewBox="0 0 32 32"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16.001 3.2c-7.059 0-12.8 5.741-12.8 12.8 0 2.259.589 4.45 1.716 6.389L3.2 28.8l6.563-1.677a12.74 12.74 0 006.238 1.609h.001c7.059 0 12.8-5.741 12.8-12.8S23.06 3.2 16.001 3.2zm0 23.466h-.001a10.62 10.62 0 01-5.403-1.49l-.386-.229-3.897 1 1.042-3.8-.253-.392a10.56 10.56 0 01-1.68-5.744c0-5.854 4.764-10.618 10.618-10.618 2.838 0 5.507 1.105 7.513 3.112a10.54 10.54 0 013.105 7.506c0 5.854-4.764 10.618-10.618 10.618zm6.07-8.011c-.331-.165-1.953-.964-2.256-1.073-.303-.11-.524-.165-.746.165-.22.331-.855 1.073-1.048 1.294-.192.22-.385.248-.716.083-.331-.165-1.397-.514-2.662-1.64-.983-.876-1.646-1.957-1.839-2.288-.192-.331-.021-.51.144-.675.148-.147.331-.385.496-.578.166-.192.221-.331.331-.551.11-.22.055-.413-.028-.578-.083-.165-.746-1.792-1.023-2.452-.269-.646-.543-.559-.746-.569-.193-.01-.414-.012-.636-.012-.22 0-.578.083-.881.413-.303.331-1.158 1.131-1.158 2.758 0 1.626 1.186 3.197 1.351 3.417.165.22 2.334 3.565 5.656 4.998.791.342 1.409.546 1.89.699.793.252 1.514.216 2.084.131.636-.094 1.953-.799 2.229-1.57.275-.771.275-1.433.193-1.57-.083-.138-.303-.22-.634-.385z" />
              </svg>

              Whatsapp
            </a>

          </div>
        </div>

        <div className="flex flex-col gap-4 md:ps-16 ">
          <h5 className="text-sm font-semibold text-gray-800 dark:text-white">Services</h5>
          <div className="space-y-2 ">
            {['UI/UX Design', 'Web Development', 'Responsive Design', 'Performance'].map((service) => (
              <div key={service} className="text-sm text-gray-600 dark:text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <h5 className="text-sm font-semibold text-gray-800 dark:text-white">Stay updated</h5>
          <p className="text-sm text-gray-600 dark:text-slate-400">Join the newsletter for occasional updates and experiments.</p>


          {/* Redesigned social icons: circular gradient background + hover */}
          <div className="flex items-center gap-3 mt-3">
            <a
              href="https://github.com/m7mdmstfa4422"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-700 shadow-sm hover:scale-105 transition-transform"
              title="GitHub"
            >
              <svg className="w-5 h-5 text-slate-800 dark:text-slate-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.95 10.95 0 012.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.42-5.28 5.7.41.35.77 1.04.77 2.09 0 1.5-.01 2.71-.01 3.08 0 .3.21.66.79.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/mohammed-mustafa-416318362/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 shadow-sm hover:scale-105 transition-transform"
              title="LinkedIn"
            >
              <svg className="w-5 h-5 text-slate-800 dark:text-slate-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0H5C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5V5c0-2.762-2.238-5-5-5zM7.5 19H4V8.99h3.5V19zM6 7.21a1.99 1.99 0 110-3.98 1.99 1.99 0 010 3.98zM20 19h-3.5v-4.41c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.68 1.14-1.68 2.33V19H10V8.99h3.36v1.37h.05c.47-.89 1.62-1.83 3.33-1.83C19.62 8.53 20 11.1 20 13.89V19z" />
              </svg>
            </a>

          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm pb-5 text-gray-600 dark:text-slate-400">© {new Date().getFullYear()} Mohammed Mustafa. All rights reserved.</p>
      </div>
    </footer>
  )
}