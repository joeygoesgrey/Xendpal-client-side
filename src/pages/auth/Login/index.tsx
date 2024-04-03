import { useState } from "react";
import { API_BASE_URL } from "@/utils/utils";

function LoginIndex() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="bg-gray-50">
        <header className="relative z-10 py-4 md:py-6">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                  {/* <img className="w-auto h-8" src="/public/bGreenMockUp.png" alt="" /> */}
                  <strong className="mx-2 my-auto text-3xl text-black font-bold">Xendpal</strong>
                </a>
              </div>

              <div className="flex md:hidden">
                <button type="button" className="text-gray-900" onClick={() => {
                  setExpanded(!expanded)
                }}>
                  {expanded ? <span x-show="expanded" aria-hidden="true">
                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span> : <span x-show="!expanded" aria-hidden="true">
                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </span>}
                </button>
              </div>

              <div className="hidden md:flex">
                <a
                  href={`${API_BASE_URL}/redoc`}
                  target="_blank"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  API DOCS
                </a>
              </div>
            </div>
            {expanded ? <nav>
              <div className="px-1 py-8">
                <div className="grid gap-y-7">

                  <a
                    href={`${API_BASE_URL}/redoc`}
                    target="_blank"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    API DOCS
                  </a>
                </div>
              </div>
            </nav> : null}

          </div>
        </header>
      </div>


      <section className="relative py-12 sm:py-16 lg:pb-40 see">

        <div className="flex items-center justify-center px-8 md:px-8">
          <div className="text-center  ">
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Static File Management Revolutionized</h1>
            <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
              Xendpal is more than just cloud storage; it's a dedicated platform crafted for developers and designers. Streamline your workflow with our high-speed concurrent uploads, advanced file chunking, and seamless API integration. Organize, host, and embed images, videos, and other static files effortlessly into your projects. Experience the freedom to manage static content without the limitations of traditional cloud storage solutions.
            </p>

            <a href={`${API_BASE_URL}/user/google_redirect`} title="" className="inline-flex px-8 py-4 mt-8 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded sm:mt-10 font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
              <svg viewBox="-0.5 0 48 48" className="h-4 mx-4  my-auto" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg> Sign in with Google

            </a>


          </div>
   
        </div>
      </section>


    </>
  );
}

export default LoginIndex;
