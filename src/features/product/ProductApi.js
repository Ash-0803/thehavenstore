export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products?_limit=10");
    const data = await response.json();

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
      } else if (
        typeof filter[key] == "string" ||
        typeof filter[key] == "number"
      ) {
        queryString += `${key}=${filter[key]}&`;
      }
  }
  // TODO : Server will filter deleted products in case of non-admin
  return new Promise(async (resolve) => {
    const url = "http://localhost:8080/products?" + queryString;

    const response = await fetch(url);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
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
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
