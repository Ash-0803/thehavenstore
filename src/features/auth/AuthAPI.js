export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://localhost:3000");
    const data = await response.json();
    resolve({ data });
  });
}
