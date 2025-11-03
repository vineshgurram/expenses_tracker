// function for retreive data 
export const getLocal = (key, defaultValue = null) => {
  const data = localStorage.getItem(key, defaultValue);
  return data ? JSON.parse(data) : defaultValue;
};

// function for set data
export const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
