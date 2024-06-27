<<<<<<< HEAD
=======
//api/utlis/error.js
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
