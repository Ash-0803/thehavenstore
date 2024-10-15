import { BACKEND_URL } from "../../app/constants";

export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/cart`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    console.log("fetchItemsByUserId");
    const response = await fetch(`${BACKEND_URL}/cart`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/cart/` + update.id, {
      method: "PATCH",
      body: JSON.stringify({ quantity: update.quantity }),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/cart/` + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const userItems = response.data;
    for (let item of userItems) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
