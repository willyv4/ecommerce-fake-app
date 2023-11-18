import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fakeStore from "../api";
import { Product } from "../types/types";
import Loader from "./Loader";
import { CheckIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { classNames } from "../Utils/utilityComponants";
import Star from "../icons/Star";
const sizes = ["Small", "Medium", "Large"];

const ProductView = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState();

  const { id }: { id?: string | undefined } = useParams();

  useEffect(() => {
    async function getById() {
      if (id) {
        const res = await fakeStore.getProductById(id);
        setProduct(res);
      }
    }

    if (id && !product) getById();
  }, [id, product]);

  console.log(product);

  if (!product) return <Loader />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg font-semibold text-gray-900 sm:text-xl">
                ${product.price}
              </p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      <div className="flex flex-row mt-1 mr-1">
                        {Array(Math.floor(product.rating.rate)).fill(
                          <Star color="gold" />
                        )}
                        {Array(5 - Math.floor(product.rating.rate)).fill(
                          <Star color="gray" />
                        )}
                      </div>
                    </div>
                    <p className="sr-only">
                      {product.rating.rate} out of 5 stars
                    </p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {product.rating.count} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">
                In stock and ready to ship
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="overflow-hidden rounded-lg p-20">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <form>
              <div>
                {/* Size selector */}
                <RadioGroup value={size} onChange={setSize}>
                  <RadioGroup.Label className="block text-sm ml-3 mb-4 font-medium text-gray-700">
                    Size
                  </RadioGroup.Label>
                  <div className="flex flex-row justify-center justify-evenly">
                    {sizes.map((s) => (
                      <RadioGroup.Option
                        as="div"
                        key={s}
                        value={s}
                        className={({ active }) =>
                          classNames(
                            active ? "ring-2 ring-indigo-500" : "",
                            "w-full mx-2 relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label
                              as="p"
                              className="text-base font-medium text-gray-900"
                            >
                              {s}
                            </RadioGroup.Label>

                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-4">
                <p className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                  <span>What size should I buy?</span>
                  <QuestionMarkCircleIcon
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </p>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add to bag
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">
                    Lifetime Guarantee
                  </span>
                </p>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
