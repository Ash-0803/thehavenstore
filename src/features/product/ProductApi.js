export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products?_limit=10");
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
export function fetchAllProductsByFilters(filter) {
  let queryString = "";

  for (const key in filter) {
    if (filter[key])
      if (typeof filter[key] == "object") {
        for (const multiple in filter[key]) {
          queryString += `${key}=${filter[key][multiple]}&`;
        }
      } else if (typeof filter[key] == "string") {
        queryString += `${key}=${filter[key]}&`;
      } else if (typeof filter[key] == "number") {
        queryString += `${key}=${filter[key]}&`;
      }
  }

  return new Promise(async (resolve) => {
    const url = "http://localhost:8080/products?" + queryString;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    console.log("filterAPI", data);
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    console.log("categories: ", data);
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    console.log("brands: ", data);
    resolve({ data });
  });
}
