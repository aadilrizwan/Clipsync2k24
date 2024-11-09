"use client";
import React  from "react";
import { Button } from "../(website)/_components/ui/moving-border";
import { useSubscription } from "@/hooks/useSubscription";

const Pricing = () => {

  const { onSubscribe } = useSubscription()
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">
            Pricing &amp; Plans
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            ClipSync offers a range of pricing plans designed to meet the needs
            of individual users, small businesses, and large enterprises.
          </p>
        </div>
        <div className="hidden mt-16 lg:block">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-8 pr-4"></th>

                <th className="px-4 py-8 text-center">
                  <span className="text-base font-medium text-blue-600">
                    {" "}
                    Free{" "}
                  </span>
                  <p className="mt-6 text-6xl font-bold  text-black">₹0</p>
                  <p className="mt-2 text-base font-normal text-gray-500">
                    Per month
                  </p>
                </th>

                <th className="px-4 py-8 text-center">
                  <span className="text-base font-medium text-blue-600">
                    {" "}
                    PRO{" "}
                  </span>
                  <p className="mt-6 text-6xl font-bold  text-black">₹4500</p>
                  <p className="mt-2 text-base font-normal text-gray-500">
                    Per month
                  </p>
                </th>

                <th className="px-4 py-8 text-center bg-gray-900 rounded-t-xl">
                  <span className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-full">
                    {" "}
                    Popular{" "}
                  </span>
                  <p className="mt-6 text-6xl font-bold text-white text-black">
                    ₹5000
                  </p>
                  <p className="mt-2 text-base font-normal text-gray-200">
                    Per month
                  </p>
                </th>

                <th className="px-4 py-8 text-center">
                  <span className="text-base font-medium text-blue-600">
                    {" "}
                    Enterprise{" "}
                  </span>
                  <p className="mt-6 text-6xl font-bold  text-black">₹7000</p>
                  <p className="mt-2 text-base font-normal text-gray-500">
                    Per month
                  </p>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-4 pr-4 font-medium border-b text-black border-gray-200">
                  Workspace
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  0
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  10
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  50
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Unlimited
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200  text-black">
                  Server storage
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  10 GB
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  100 GB
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  1 TB
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Unlimited
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200  text-black">
                  File Sharing
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  7 Days
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  30 Days
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  90 Days
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Full with recovery
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200  text-black">
                  Device sync
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  -
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  <svg
                    className="w-5 h-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  <svg
                    className="w-5 h-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200">
                  <svg
                    className="w-5 h-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200  text-black">
                  Support
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Chatbot support
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Priority Support
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  Priority support
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  24/7 premium support
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200  text-black">
                  Video Recording
                </td>
                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  5 min
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  30 min
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  2 hr
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  10 hr
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200  text-black">
                  Ai Feature
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  -
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Generate title and Description
                </td>
                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  Generate title ,Description with Transcript
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Fully Support
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200  text-black">
                  Best For
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Individuals,Freelancers
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Small teams & individuals
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  Growing Business & teams
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200  text-black">
                  Large enterprises & organisations
                </td>
              </tr>

              <tr>
                <td className="py-6 pr-4"></td>

                <td className="px-4 py-6 text-center">
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Get Started
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </td>

                <td className="px-4 py-6 text-center">
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Get Started
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </td>

                {/* task */}
                <td className="px-4 py-6 text-center text-white bg-yellow-500 rounded-b-xl">
                  <Button
                  className="text-sm w-full "
                  onClick={onSubscribe}
                  >
                    Get Started
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </td>

                <td className="px-4 py-6 text-center">
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Get Started
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Pricing;
