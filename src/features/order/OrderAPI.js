import { BACKEND_URL } from "../../app/constants";

export function createOrder(item) {
  console.log(item);
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/orders`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/orders/` + order.id, {
      method: "PATCH",
      body: JSON.stringify({ status: order.status }),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`${BACKEND_URL}/orders?` + queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
