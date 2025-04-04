const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function fetchAllProductsByFilters(filter) {
  let queryString = "";

  for (const key in filter) {
    if (filter[key])
      if (typeof filter[key] == "object") {
        for (const multiple in filter[key]) {
          queryString += `${key}=${filter[key][multiple]}&`;
        }
      } else if (
        typeof filter[key] == "string" ||
        typeof filter[key] == "number" ||
        typeof filter[key] == "boolean"
      ) {
        queryString += `${key}=${filter[key]}&`;
      }
  }
  // TODO : Server will filter deleted products in case of non-admin
  return new Promise(async (resolve) => {
    const url = `${BACKEND_URL}/products?` + queryString;
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/products/`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/products/` + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/categories`);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/brands`);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`${BACKEND_URL}/products/` + id);
    const data = await response.json();
    resolve({ data });
  });
}
