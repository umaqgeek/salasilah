export const isValidInput = (input) => {
  if (input.isNull == false && input.value == '') {
    return {
      status: false,
      message: 'Cannot leave blank for ' + input.name,
    };
  }
  return {
    status: true,
    message: '',
  };
};
