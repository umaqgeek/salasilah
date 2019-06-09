export const getSqlErrors = (sqlErrorMessage) => {
  if (typeof sqlErrorMessage !== 'undefined') {
    if (sqlErrorMessage.toLowerCase().includes('SQLSTATE[23000]'.toLowerCase())) {
      return 'Duplicate data';
    }
    if (sqlErrorMessage.toLowerCase().includes('Unauthorised'.toLowerCase())) {
      return 'Access denied';
    }
  }
  return 'Server error';
};
