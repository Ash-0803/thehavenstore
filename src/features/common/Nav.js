import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectItems } from "../cart/CartSlice";
import { selectUserInfo } from "../User/UserSlice";

const navigation = [
  { name: "HOME", href: "/", user: true },
  { name: "TEAM", href: "#", user: true },
  { name: "ADMIN", href: "/admin", admin: true },
  { name: "ORDERS", href: "/admin/orders", admin: true },
];
var userNavigation = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {
  const cartItems = useSelector(selectItems);
  var userInfo = useSelector(selectUserInfo); // FIXME: this user should be const rather than a variable
  console.log(userInfo);
  if (userInfo == null) {
    userInfo = {};
    userInfo.role = "user";
    userNavigation = [
      { name: "Your Profile", href: "/profile" },
      { name: "My Orders", href: "/orders" },
      { name: "Login", href: "/login" },
    ];
  } // FIXME: this is a temporary method to solve the new user's navigation problem.
  else {
    userNavigation = [
      { name: "Your Profile", href: "/profile" },
      { name: "My Orders", href: "/orders" },
      { name: "Sign Out", href: "/logout" },
    ];
  }
  return (
    <>
      <div className="min-h-full bg-pale-blue border-black border-b bordering sticky top-0 z-50">
        <Disclosure as="nav" className="">
          {({ open }) => (
            <>
              <div className="min-w-full  px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <Link
                    to="/"
                    className="flex-shrink-0 flex flex-row items-center "
                  >
                    <img
                      className="m-0 h-[29px] grayscale"
                      src="/thehaven-circle.png"
                      alt="Your Company"
                    />
                    <span className=" font-poiret text-3xl pl-2 font-bold hover:text-gray-900 transition-all ease-in-out">
                      The
                      <span className="text-coral-red hover:text-inherit">
                        Haven
                      </span>
                      Store
                    </span>
                  </Link>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) =>
                        userInfo.role === "admin" ? (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white hover:shadow-white"
                                : " text-gray-800 card-small",
                              "rounded-md px-5 leading-loose text-xl tracking-wide font-normal "
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ) : item.user ? (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white hover:shadow-white"
                                : " text-gray-800 card-small",
                              "rounded-md px-5 leading-loose text-xl tracking-wide font-normal "
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ) : null
                      )}
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link
                        to="cart"
                        className="relative rounded-full  p-1 text-gray-900 hover:text-coral-red focus:bg-coral-red focus:text-white"
                      >
                        <span className="absolute -inset-1.5" />
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Link>
                      {/* ITEMS IN CART */}

                      <span className="relative items-center bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-coral-light mb-7 -ml-3">
                        {cartItems.length}
                      </span>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {userInfo && userInfo.imageUrl ? (
                              <img
                                className="h-8 w-8 rounded-full"
                                src={userInfo.imageUrl}
                                alt=""
                              />
                            ) : (
                              <UserCircleIcon className="text-white text-xl p-5" />
                            )}
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => {
                              return (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) =>
                    item[userInfo.role] ? (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ) : null
                  )}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="#" alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {userInfo && userInfo.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userInfo && userInfo.email}
                      </div>
                    </div>
                    <Link
                      to="cart"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                    {cartItems.length > 0 ?? (
                      <span className="relative items-center rounded-full bg-gray-50 px-2 py-1 text-xs font- mb-7 -ml-3 text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => {
                      return (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      );
                    })}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          {/* <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"/> */}

          {children}
        </main>
      </div>
    </>
  );
}
