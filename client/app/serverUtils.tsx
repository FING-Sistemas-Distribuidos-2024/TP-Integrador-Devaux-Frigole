const loadEnv = async () => {
  const response = await fetch("/api/loadEnv");
  const { backURL } = await response.json();
  return backURL;
};
