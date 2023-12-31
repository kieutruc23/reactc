/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  HiOutlineShoppingBag,
  HiMenuAlt1,
  HiOutlineSearch,
  HiX,
  HiPlusSm,
  HiMinusSm,
  // HiOutlineUserCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { decrease, increase, remove } from "../slices/Cart";
import * as CurrencyFormat from "react-currency-format";

const navigation = {
  pages: [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Sản phẩm", href: "/products" },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useAppDispatch();
  const { items: carts } = useAppSelector((state) => state.cart);
  const total = carts.reduce((sum: any, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);
  const countCart = carts.length;

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Đóng</span>
                    <HiX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        to={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* <div className="flow-root">
                    <div className="flex gap-2 items-center hover:opacity-80 cursor-pointer">
                      <HiOutlineUserCircle size={23} />
                      Hoang
                    </div>
                  </div> */}
                  <div className="flow-root">
                    <Link
                      to="/signin"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/signup"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Tạo tài khoản
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://i.pinimg.com/564x/2a/cb/7d/2acb7d9371550e4f145d5a1a841a41cb.jpg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      VI
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <HiMenuAlt1 className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://res.cloudinary.com/dxa8ks06k/image/upload/v1687326391/takemichi/behance-circle_gkise5.png"
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <div className="flex gap-2 items-center cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800">
                    <HiOutlineUserCircle size={23} />
                    Hoang
                  </div>
                </div> */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to="/signin"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Đăng nhập
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Tạo tài khoản
                  </Link>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      src="https://i.pinimg.com/564x/2a/cb/7d/2acb7d9371550e4f145d5a1a841a41cb.jpg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">VI</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <HiOutlineSearch className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    className="group -m-2 flex items-center p-2"
                    onClick={() => setOpenCart(true)}
                  >
                    <HiOutlineShoppingBag
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-indigo-600 group-hover:text-gray-800">
                      {countCart}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Shopping cart */}
      <Transition.Root show={openCart} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenCart}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Giỏ hàng của bạn
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpenCart(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Đóng panel</span>
                              <HiX className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {carts.length === 0 ? (
                                <div className="text-gray-400 py-2 text-sm">
                                  Giỏ hàng trống...
                                </div>
                              ) : (
                                <>
                                  {carts.map((product: any) => {
                                    return (
                                      <li
                                        key={product.id}
                                        className="flex py-6"
                                      >
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <img
                                            src={product.image}
                                            alt="image of product"
                                            className="h-full w-full object-cover object-center"
                                          />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                              <h3>
                                                <Link to={product.id}>
                                                  {product.name}
                                                </Link>
                                              </h3>
                                              <p className="ml-4">
                                                <CurrencyFormat
                                                  value={
                                                    product.price *
                                                    product.quantity
                                                  }
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  suffix={" VND"}
                                                />
                                              </p>
                                            </div>
                                            <p className="flex gap-2 items-center text-sm text-gray-500">
                                              <button
                                                className="border-2 border-gray-500 rounded-md hover:opacity-70"
                                                onClick={() =>
                                                  dispatch(decrease(product.id))
                                                }
                                              >
                                                <HiMinusSm size={20} />
                                              </button>
                                              <button
                                                className="border-2 border-gray-500 rounded-md hover:opacity-70"
                                                onClick={() =>
                                                  dispatch(increase(product.id))
                                                }
                                              >
                                                <HiPlusSm size={20} />
                                              </button>
                                            </p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                              Số lượng: {product.quantity}
                                            </p>

                                            <div className="flex">
                                              <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() =>
                                                  dispatch(remove(product.id))
                                                }
                                              >
                                                Xoá
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Tổng giá</p>
                          <p>
                            <CurrencyFormat
                              value={total}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={" VND"}
                            />
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Phí vận chuyển và thuế được tính khi thanh toán.
                        </p>
                        <div className="mt-6">
                          <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenCart(false)}
                            >
                              Thanh toán
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
