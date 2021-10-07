const validate = (type, value) => {
  switch (type) {
    case "email":
      // if (
      //   value.includes("gmail") ||
      //   value.includes("yahoo") ||
      //   value.includes("hotmail") ||
      //   value.includes("msn")
      // )
      //   return "Only corporate mail ids allowed";

      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
        ? ""
        : "Email is not valid";
    case "text":
      return value.length < 6 ? "Min 6 characters" : "";
    case "tel":
      return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        value
      )
        ? ""
        : "Invalid Phone Number";
    default:
      return true;
  }
};

export default validate;
