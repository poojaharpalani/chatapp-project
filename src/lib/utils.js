import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57]  text-[#ff00e] border-[1px] border-[#ff006faa]",
  "bg-[#E78F81]  text-[#ff00e] border-[1px] border-[#001F3F]",
  "bg-[#54C392]  text-[#ff00e] border-[1px] border-[#001F3F]",
  "bg-[#87A2FF]  text-[#ff00e] border-[1px] border-[#87A2FF]",
  "bg-[#6A9AB0]  text-[#ff00e] border-[1px] border-[#6A9AB0]",
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
};
