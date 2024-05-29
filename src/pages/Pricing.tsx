import React from "react";
import Navbar from "@/components/Other/Navbar";
import Footer from "@/components/Other/FooterComp";

const PricingSection: React.FC = () => {
  return (
    <>
      <Navbar />
      <div
        className="pt-5  "
        id="pricing"
        style={{ background: "linear-gradient(white, #62D9C3)" }}
      >
        <div className="mx-auto pb-20 mt-4 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-base font-semibold leading-7 text-indigo-400">
              Pricing
            </h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Whether it's just you, or your entire team - we've got you
              covered.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-black">
            Choose the product that works best
          </p>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <FirstProduct />
            <SecondProduct />
            <ThirdProduct />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const ThirdProduct: React.FC = () => {
  return (
    <>
      <div className="ring-1 ring-white/10 border border-teal-500 rounded-3xl p-8 xl:p-10">
        <div className="flex items-center justify-between gap-x-4">
          <h2
            id="product3"
            className="text-lg font-semibold leading-8 text-teal-600"
          >
            Storage
          </h2>
        </div>
        <p className="mt-4 text-sm leading-6 text-black">
          Product details for Product Type 3
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-teal-600">
            € 50 / unit
          </span>
        </p>
        <a
          href="/order"
          aria-describedby="product3"
          className="bg-white/10 border border-green-500 text-teal-600 hover:bg-white/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Order Now
        </a>
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-black xl:mt-10"
        >
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            240 units
          </li>
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            6 different features
          </li>
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            Fast delivery
          </li>
        </ul>
      </div>
    </>
  );
};

const SecondProduct: React.FC = () => {
  return (
    <>
      <div className="bg-white/5 ring-2 ring-black border border-black rounded-3xl p-8 xl:p-10">
        <div className="flex items-baseline justify-between gap-x-4">
          <h2
            id="product2"
            className="text-lg font-semibold leading-8 text-teal-600"
          >
            Team
          </h2>
          <p className="rounded-full bg-xendpal  px-2.5 py-1 text-xs font-semibold leading-5 text-white">
            Most popular
          </p>
        </div>
        <p className="mt-4 text-sm leading-6 text-black">
          The most popular choice. Product details for Product Type 2
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-teal-600">
            € 20 / unit
          </span>
        </p>
        <a
          href="/order"
          aria-describedby="product2"
          className="  border border-green-500 text-teal-600 shadow-sm hover:bg-black focus-visible:outline-indigo-500 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Order Now
        </a>
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-black xl:mt-10"
        >
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            120 units
          </li>
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            3 different features
          </li>
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            Fast delivery
          </li>
        </ul>
      </div>
    </>
  );
};

const FirstProduct: React.FC = () => {
  return (
    <>
      <div className="ring-1 ring-white/10 border border-green-500 rounded-3xl p-8 xl:p-10">
        <div className="flex items-center justify-between gap-x-4">
          <h2
            id="product1"
            className="text-lg font-semibold leading-8 text-teal-600"
          >
            DEV
          </h2>
        </div>
        <p className="mt-4 text-sm leading-6 text-black">
          Product details for Product Type 1
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-teal-600">
            € 10 / unit
          </span>
        </p>
        <a
          href="/order"
          aria-describedby="product1"
          className="bg-white/10 border border-green-500 text-teal-600 hover:bg-white/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Order Now
        </a>
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-black xl:mt-10"
        >
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            40 units
          </li>
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            1 feature
          </li>
          <li className="flex gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-teal-600"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            Fast delivery
          </li>
        </ul>
      </div>
    </>
  );
};

export default PricingSection;
