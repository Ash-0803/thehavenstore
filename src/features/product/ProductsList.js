import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountedPrice } from "../../app/constants";
import Pagination from "../common/Pagination";
import {
  fetchAllProductsByFiltersAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectProductStatus,
  selectTotalItems,
} from "./ProductSlice";

export default function ProductsList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const [filter, setFilter] = useState({ _page: 1, _limit: ITEMS_PER_PAGE });
  function handleFilter(e, section, option) {
    e.target.checked
      ? setFilter({
          ...filter,
          _page: 1,
          [section.id]: {
            ...filter[section.id],
            [option.id]: option.value,
          },
        })
      : setFilter((current) => {
          const copy = { ...current };
          if (copy[section.id]) delete copy[section.id][option.id];
          copy._page = 1;
          return copy;
        });
  }
  function handleSort(option) {
    setFilter({
      ...filter,
      _page: 1,
      _order: option.order,
      _sort: option.sort,
    });
  }
  function handlePage(page_no) {
    // console.log({ ...page, _page: page_no });
    setFilter({ ...filter, _page: page_no });
  }

  useEffect(() => {
    dispatch(fetchAllProductsByFiltersAsync(filter));
  }, [filter]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const sortOptions = [
    // { name: "Most Popular", order: "desc",sort:"price", current: true },
    { name: "Best Rating", order: "desc", sort: "rating", current: false },
    // { name: "Newest", order: "desc",sort:"price", current: false },
    { name: "Price: Low to High", order: "asc", sort: "price", current: false },
    {
      name: "Price: High to Low",
      order: "desc",
      sort: "price",
      current: false,
    },
  ];
  const subCategories = [
    { name: "Totes", href: "#" },
    { name: "Backpacks", href: "#" },
    { name: "Travel Bags", href: "#" },
    { name: "Hip Bags", href: "#" },
    { name: "Laptop Sleeves", href: "#" },
  ];
  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { id: 1, value: "white", label: "White", checked: false },
        { id: 2, value: "beige", label: "Beige", checked: false },
        { id: 3, value: "blue", label: "Blue", checked: true },
        { id: 4, value: "brown", label: "Brown", checked: false },
        { id: 5, value: "green", label: "Green", checked: false },
        { id: 6, value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "brand",
      options: brands,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          handleFilter={handleFilter}
          filters={filters}
          subCategories={subCategories}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-400 py-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              <span className="text-coral-red">New</span> Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-coral-light"
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
                            <button
                              onClick={() => handleSort(option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-coral-light sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
                subCategories={subCategories}
              />

              {/* Product grid */}
              <ProductGrid products={products} totalItems={totalItems} />
              {/* Products grid end */}
            </div>
          </section>
          <Pagination
            filter={filter}
            handlePage={handlePage}
            totalItems={totalItems}
          />
        </main>
      </div>
    </div>
  );
}

function ProductGrid({ products, totalItems }) {
  const productStatus = useSelector(selectProductStatus);
  return (
    <div className="lg:col-span-3">
      <div className="bg-white h-full">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl h-full lg:px-8">
          {productStatus === "loading" ? (
            <div className="flex flex-col justify-center items-center h-full">
              <Triangle
                visible={true}
                height="100"
                width="100"
                color="#FF6452"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              Products Loading...
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.length > 0 &&
                products &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export function ProductCard({ product }) {
  return (
    <div
      key={product.id}
      className="card rounded-lg p-4 group relative border-gray-400 border-2 bg-pale-blue"
    >
      <div className=" ">
        <Link to={`/product/${product.id}`}>
          <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-60">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-900">
                <span aria-hidden="true" className="absolute" />
                {product.title}
              </h3>
              <p className="mt-1 text-sm text-gray-700">
                <StarIcon className="w-5 h-5 inline" />
                <span className="align-bottom pl-2">{product.rating}</span>
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                ${discountedPrice(product)}
              </p>
              <p className="text-sm font-medium text-gray-400 line-through">
                ${product.price}
              </p>
            </div>
          </div>
          {product.stock <= 0 && (
            <p className="text-sm text-center text-white-400 bg-gray-700 mt-2 py-1 rounded-md">
              out of stock
            </p>
          )}
        </Link>
      </div>
    </div>
  );
}
function MobileFilter({
  filters,
  handleFilter,
  subCategories,
  setMobileFiltersOpen,
  mobileFiltersOpen,
}) {
  return (
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
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <Link to={category.href} className="block px-2 py-3">
                        {category.name}
                      </Link>
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
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options &&
                              section.options.map((option, optionIdx) => (
                                <div
                                  key={option.id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
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
  );
}
function DesktopFilter({ filters, handleFilter, subCategories }) {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
        {subCategories.map((category) => (
          <li key={category.name}>
            <Link to={category.href}>{category.name}</Link>
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
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options &&
                    section.options.map((option, optionIdx) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
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
  );
}
