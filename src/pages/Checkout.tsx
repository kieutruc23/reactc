/* eslint-disable @typescript-eslint/no-explicit-any */
import * as CurrencyFormat from "react-currency-format";
import { HiOutlineTrash } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { remove, removeCarts } from "../slices/Cart";
import { useAddOrderMutation } from "../api/order";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items: carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [addOrder] = useAddOrderMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onHandleSubmit = (value: any) => {
    addOrder({ ...value, items: carts })
      .unwrap()
      .then(() => {
        toast.success("Đặt hàng thành công!");
        dispatch(removeCarts());
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
    // console.log('don hang:',{...value, items: carts})
  };
  const total = carts.reduce((sum: any, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);
  return (
    <div className="bg-white">
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Thanh toán đơn hàng
            </h1>
          </div>
          <div className="flex justify-between gap-3 items-center py-5">
            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className="
                grid 
                grid-cols-2 
                gap-4 
                md:grid-cols-2
                sm:grid-cols-1
                min-[320px]:grid-cols-1
              "
            >
              <div className="flex flex-col gap-2 pb-2">
                <div className="space-y-12">
                  <div>
                    <h2 className="text-lg font-semibold leading-7 text-gray-900">
                      Thông tin giao hàng
                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-full">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Họ và tên
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="name"
                            autoComplete="name"
                            {...register("name", { required: true })}
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <span className="text-red-500">
                              Không được bỏ trống
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Không được bỏ trống",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Email sai định dạng",
                              },
                            })}
                            type="text"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />

                          {errors.email && (
                            <div className="text-red-500">
                              {errors.email.message as React.ReactNode}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Số điện thoại
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            type="phone"
                            {...register("phone", { required: true })}
                            autoComplete="phone"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <span className="text-red-500">
                              Không được bỏ trống
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Địa chỉ
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("address", { required: true })}
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <span className="text-red-500">
                              Không được bỏ trống
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Tỉnh / Thành phố
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", { required: true })}
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <span className="text-red-500">
                              Không được bỏ trống
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Quận / Huyện
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("district", { required: true })}
                            id="region"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <span className="text-red-500">
                              Không được bỏ trống
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("zip")}
                            id="postal-code"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg px-4 pt-2 pb-2 border border-gray-300">
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold leading-7 text-gray-900">
                      Đơn hàng
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-full w-[588px] overflow-y-auto min-h-[200px] max-h-[300px]">
                        {carts.length === 0 ? (
                          <div className="text-sm text-gray-500 font-medium">
                            Đơn hàng trống...
                          </div>
                        ) : (
                          <>
                            {carts?.map((item: any) => {
                              return (
                                <div
                                  key={item.id}
                                  className="
                                  flex 
                                  gap-3 
                                  mt-2 py-4
                                  w-full
                                  items-center
                                  "
                                >
                                  <img
                                    src={item?.image}
                                    alt="image of product"
                                    className="
                                    rounded-md 
                                    w-[20%]
                                    min-[400px]:w-[10%]
                                    "
                                  />
                                  <div className="relative">
                                    <p className="text-base font-medium sm:truncate">
                                      {item?.name}
                                    </p>
                                    <p className="flex text-sm py-1 text-gray-500">
                                      Size: 36
                                    </p>
                                    <p className="flex text-sm py-1">
                                      <CurrencyFormat
                                        value={item?.price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={" VND"}
                                      />
                                    </p>
                                    <p className="flex text-sm py-1 text-gray-700">
                                      x {item.quantity}
                                    </p>
                                    <div
                                      className="
                                    absolute bottom-0 left-8
                                    "
                                    >
                                      <button
                                        type="button"
                                        className="
                                        hover:opacity-75
                                        "
                                        onClick={() =>
                                          dispatch(remove(item.id))
                                        }
                                      >
                                        <HiOutlineTrash size={20} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between border-b border-gray-900/10 py-4">
                  <p className="text-base font-semibold">Total:</p>
                  <p>
                    <CurrencyFormat
                      value={total}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" VND"}
                    />
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Hoàn tất đặt hàng
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
