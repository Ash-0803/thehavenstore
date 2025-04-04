const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
export function logoutUser(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
    // TODO: on server we will remove user session
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInfo),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (err) {
      reject({ err: err.message });
    }
  });
}
export function checkAuth(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/check`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (err) {
      reject({ err: err.message });
    }
  });
}
