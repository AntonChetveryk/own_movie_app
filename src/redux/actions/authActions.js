export const updateAuth = (payload) => {
  return { type: "UPDATE_AUTH", payload };
};

export const onLogOut = () => {
  return { type: "LOG_OUT" };
};

export const toggleModal = () => {
  return { type: "TOGGLE_MODAL" };
};
