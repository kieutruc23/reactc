/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition, RadioGroup } from "@headlessui/react";
import {
  HiX,
  HiMinus,
  HiPlus,
  HiChevronDown,
  HiViewGrid,
  HiFilter,
  HiOutlineEye
} from "react-icons/hi";
import { useGetProductsQuery } from "../api/product";
import * as CurrencyFormat from 'react-currency-format';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { useGetSizesQuery } from "../api/sizes";
import { useGetCategoriesQuery } from "../api/category";

const colors = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Low Top", href: "#" },
  { name: "High Top", href: "#" },
  { name: "Slip-on", href: "#" },
  { name: "Mid Top", href: "#" },
  { name: "Mule", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductsPage() {
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const {data: products, isLoading: isLoadingProducts} = useGetProductsQuery()
  const {data: sizes} = useGetSizesQuery()
  const {data: categories} = useGetCategoriesQuery()
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState([])

  // Filters
  const filters = [
    {
      id: "color",
      name: "Màu",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: true },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Danh mục",
      options: categories?.map((item:any) => {
        return {
          value: item.id,
          label: item.name,
          checked: false
        }
      })
    },
    {
      id: "size",
      name: "Kích cỡ",
      options: sizes?.map((item:any) => {
        return {
          value: item.id,
          label: item.size,
          checked: false
        }
      })
    },
  ];

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Lọc</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Đóng</span>
                      <HiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Danh mục</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <HiMinus
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <HiPlus
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section?.options?.map((option:any, optionIdx:any) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Mọi người đều mua
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sắp xếp
                    <HiChevronDown
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">Hiển thị lưới</span>
                <HiViewGrid className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Lọc</span>
                <HiFilter className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Sản phẩm
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Danh mục</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <HiMinus
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <HiPlus
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section?.options?.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {isLoadingProducts ? (
                  <div className="flex gap-6 items-center pt-5">
                    <div>
                      <Skeleton width={280} height={320} />
                      <Skeleton width={280} />
                    </div>
                    <div>
                      <Skeleton width={280} height={320} />
                      <Skeleton width={280} />
                    </div>
                    <div>
                      <Skeleton width={280} height={320} />
                      <Skeleton width={280} />
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:gap-x-8">
                    {products?.map((product) => (
                      <div key={product.id}>
                        <div className="group relative">
                          <button
                            className="absolute top-[45%] left-[45%] drop-shadow-md hover:border-2 border-black rounded-lg"
                            onClick={() => setOpen(true)}
                          >
                            <HiOutlineEye
                              size={32}
                              className="opacity-0 group-hover:opacity-100"
                            />
                          </button>
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                              src={product.image}
                              alt="image of product"
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div>
                              <h3 className="text-sm text-gray-700">
                                <Link to={`/products/${product.id}`}>
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                  />
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              <CurrencyFormat
                                value={product?.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" VND"}
                              />
                            </p>
                          </div>
                        </div>
                        <Transition.Root show={open} as={Fragment}>
                          <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={setOpen}
                          >
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 overflow-y-auto">
                              <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                                <Transition.Child
                                  as={Fragment}
                                  enter="ease-out duration-300"
                                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                  enterTo="opacity-100 translate-y-0 md:scale-100"
                                  leave="ease-in duration-200"
                                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                >
                                  <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                      <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setOpen(false)}
                                      >
                                        <span className="sr-only">Đóng</span>
                                        <HiX
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      </button>

                                      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                          <img
                                            src={product?.image}
                                            alt="image of product"
                                            className="object-cover object-center w-full h-[450px]"
                                          />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                            {product?.name}
                                          </h2>

                                          <section
                                            aria-labelledby="information-heading"
                                            className="mt-2"
                                          >
                                            <h3
                                              id="information-heading"
                                              className="sr-only"
                                            >
                                              Thông tin sản phẩm
                                            </h3>
                                            <p className="text-2xl text-gray-900">
                                              {product?.price}
                                            </p>
                                          </section>

                                          <section
                                            aria-labelledby="options-heading"
                                            className="mt-10"
                                          >
                                            <h3
                                              id="options-heading"
                                              className="sr-only"
                                            >
                                              Product options
                                            </h3>

                                            <form>
                                              {/* Colors */}
                                              <div>
                                                <h4 className="text-sm font-medium text-gray-900">
                                                  Color
                                                </h4>

                                                <RadioGroup
                                                  value={selectedColor}
                                                  onChange={setSelectedColor}
                                                  className="mt-4"
                                                >
                                                  <RadioGroup.Label className="sr-only">
                                                    Choose a color
                                                  </RadioGroup.Label>
                                                  <span className="flex items-center space-x-3">
                                                    {colors.map((color) => (
                                                      <RadioGroup.Option
                                                        key={color.name}
                                                        value={color}
                                                        className={({
                                                          active,
                                                          checked,
                                                        }) =>
                                                          classNames(
                                                            color.selectedClass,
                                                            active && checked
                                                              ? "ring ring-offset-1"
                                                              : "",
                                                            !active && checked
                                                              ? "ring-2"
                                                              : "",
                                                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                                          )
                                                        }
                                                      >
                                                        <RadioGroup.Label
                                                          as="span"
                                                          className="sr-only"
                                                        >
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
                                                  </span>
                                                </RadioGroup>
                                              </div>

                                              {/* Sizes */}
                                              <div className="mt-10">
                                                <div className="flex items-center justify-between">
                                                  <h4 className="text-sm font-medium text-gray-900">
                                                    Size
                                                  </h4>
                                                  <a
                                                    href="#"
                                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                  >
                                                    Size guide
                                                  </a>
                                                </div>

                                                <RadioGroup
                                                  value={selectedSize}
                                                  onChange={setSelectedSize}
                                                  className="mt-4"
                                                >
                                                  <RadioGroup.Label className="sr-only">
                                                    Choose a size
                                                  </RadioGroup.Label>
                                                  <div className="grid grid-cols-4 gap-4">
                                                    {sizes?.map((item) => (
                                                      <RadioGroup.Option
                                                        key={item?.size}
                                                        value={item}
                                                        disabled={!item?.inStock}
                                                        className={({
                                                          active,
                                                        }) =>
                                                          classNames(
                                                            item?.inStock
                                                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                                                            active
                                                              ? "ring-2 ring-indigo-500"
                                                              : "",
                                                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                                          )
                                                        }
                                                      >
                                                        {({
                                                          active,
                                                          checked,
                                                        }) => (
                                                          <>
                                                            <RadioGroup.Label as="span">
                                                              {item?.size}
                                                            </RadioGroup.Label>
                                                            {item?.inStock ? (
                                                              <span
                                                                className={classNames(
                                                                  active
                                                                    ? "border"
                                                                    : "border-2",
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
                                                type="submit"
                                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                              >
                                                Add to bag
                                              </button>
                                            </form>
                                          </section>
                                        </div>
                                      </div>
                                    </div>
                                  </Dialog.Panel>
                                </Transition.Child>
                              </div>
                            </div>
                          </Dialog>
                        </Transition.Root>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
