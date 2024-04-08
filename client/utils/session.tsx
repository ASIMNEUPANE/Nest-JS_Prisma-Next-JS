export const setToken = (token: string) => {
  console.log(token)
  const saveToken = localStorage.setItem("access_token", token);
  if (saveToken === null || saveToken === undefined) return null;
  return true;
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};


export const removeToken = () => {
  return localStorage.removeItem("access_token");

};

