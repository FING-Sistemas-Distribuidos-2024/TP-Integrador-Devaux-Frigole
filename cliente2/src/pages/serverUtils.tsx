export const getBackURL = async () => {
  const response = await fetch("/api");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const url = await response.json();
  console.log(url);
  return url;
};
