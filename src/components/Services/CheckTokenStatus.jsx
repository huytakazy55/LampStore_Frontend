import {jwtDecode} from 'jwt-decode';

const checkTokenAndLogout = () => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    localStorage.clear();
    //window.location.href = '/';
    return;
  }

  try {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp * 1000;
    if (new Date().getTime() > expiryTime) {
      localStorage.clear();
      //window.location.href = '/';
    }
  } catch (error) {
    localStorage.clear();
    //window.location.href = '/';
  }
};

const startTokenCheck = () => {
  setInterval(() => {
    checkTokenAndLogout();
  }, 60000);
};

startTokenCheck();
