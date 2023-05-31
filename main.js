import MagnatizedButton from "./MagnatizeButton";

const buttons = document.querySelectorAll(".magnatize");

buttons.forEach((button) => {
  new MagnatizedButton({ element: button });
});
