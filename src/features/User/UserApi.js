const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/users/own`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/orders/own`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/users/` + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
