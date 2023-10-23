import { HiStar } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useAppDispatch } from "../store/hook";
import { add } from "../slices/Cart";
import * as CurrencyFormat from "react-currency-format";
import { useGetSizesQuery } from "../api/sizes";
import { toast } from "react-hot-toast";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];

// const highlights = [
//   "Hand cut and sewn locally",
//   "Dyed with our proprietary colors",
//   "Pre-washed & pre-shrunk",
//   "Ultra-soft 100% cotton",
// ];
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const {data: sizes} = useGetSizesQuery();
  const [selectedSize, setSelectedSize] = useState();
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    id || ""
  )
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        {/* <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            {isLoadingProduct ? (
              <Skeleton width={450} height={350} />
            ) : (
              <img
                src={product?.image}
                alt="image of product"
                className="h-[350px] w-full object-cover object-center"
              />
            )}
          </div>
        </div> */}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {isLoadingProduct ? <Skeleton /> : product?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Thông tin sản phẩm</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {isLoadingProduct ? (
                <Skeleton />
              ) : (
                <CurrencyFormat
                  value={product?.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              )}
            </p>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">
                Chi tiết sản phẩm
              </h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product?.detail}</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Đánh giá</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <HiStar
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} 5 sao của chúng tôi</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} đánh giá
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Chọn một màu
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    Kích thước
                  </h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Hướng dẫn chọn kích thước
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Chọn một kích thước
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {sizes?.map((item) => (
                      <RadioGroup.Option
                        key={item?.size}
                        value={item}
                        disabled={!item.inStock}
                        className={({ active }) =>
                          classNames(
                            item.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {item.size}
                            </RadioGroup.Label>
                            {item.inStock ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="button"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  dispatch(add({ ...product, quantity: 1 }))
                  toast.success('Thêm vào giỏ hàng thành công')
                }
                }
              >
                Thêm vào giỏ hàng
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Mô tả</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {isLoadingProduct ? <Skeleton /> : product?.desc}
                </p>
              </div>
            </div>

            <div className="mt-10">
              {/* <h3 className="text-sm font-medium text-gray-900">Nổi bật</h3> */}

              <div className="mt-4">
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    {isLoadingProduct ? (
                      <Skeleton width={450} height={350} />
                    ) : (
                      <img
                        src={product?.image}
                        alt="image of product"
                        className="h-[500px] w-full object-cover object-center"
                      />
                    )}
                  </div>
              </div>
            </div>

            {/* <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">
                Chi tiết sản phẩm
              </h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product?.detail}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;
