export async function getNodes() {
  const url = "https://functions.yandexcloud.net/d4e7argpi2fe7epuh65b";
  const response = await fetch(url);
  return response.json();
}
