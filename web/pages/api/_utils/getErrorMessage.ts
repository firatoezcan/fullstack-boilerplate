export const getErrorMessage = (error: any) => {
  let message = error?.message;
  if (!message) {
    console.error(error);
    message = "An unexpected error occured";
    if (process.env.NODE_ENV === "development") {
      message += "\nCheck the console for more details";
    }
  }
  return message;
};

export const rethrowHasuraError = (context: string | string[]) => (e: any) => {
  const contextArr = Array.isArray(context) ? context : [context];
  if (e.response) {
    const { errors } = e.response || {};
    if (errors) {
      throw new Error(errors.map((error: any) => `[${contextArr.join("/")}]/[${error.extensions.code}]: ${error.message}`).join("\n"));
    }
  }
  throw e;
};
