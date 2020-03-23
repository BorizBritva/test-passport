const exit = () => {
  localStorage.clear();
  window.location.assign(`${window.location.origin}/auth`);
}

export default exit;
