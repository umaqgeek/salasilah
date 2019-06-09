export const ScreenList = (userType, pathName) => {
  var pages = [];
  var status = true;
  if (userType == 'administrator') {
    pages = [
      '/dashboard',
      '/manage-admin',
      '/manage-flights',
      '/manage-places',
      '/manage-addon-packages',
      '/manage-account',
      '/account',
      '/manage-users',
      '/manage-booking',
      '/manage-travel',
    ];
    if (!pages.find((page) => { return pathName.toLowerCase().includes(page.toLowerCase()) })) {
      status = false
    }
  } else if (userType == 'staff') {
    pages = [
      '/dashboard',
      '/account',
    ];
    if (!pages.find((page) => { return pathName.toLowerCase().includes(page.toLowerCase()) })) {
      status = false
    }
  } else {
    status = false;
  }
  return status;
};
