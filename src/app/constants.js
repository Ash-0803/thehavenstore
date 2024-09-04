import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { shieldTick, support, truckFast } from "../assets/icons";
import { customer1, customer2 } from "../assets/images";

export const ITEMS_PER_PAGE = 9;
export const BACKEND_URL = "http://localhost:8080";
export function discountedPrice(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
}

export const statistics = [
  { value: "1k+", label: "Brands" },
  { value: "500+", label: "Shops" },
  { value: "250k+", label: "Customers" },
];

export const services = [
  {
    imgURL: truckFast,
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    imgURL: shieldTick,
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    imgURL: support,
    label: "Love to help you",
    subtext: "Our dedicated team is here to assist you every step of the way.",
  },
];

export const reviews = [
  {
    imgURL: customer1,
    customerName: "Morich Brown",
    rating: 4.5,
    feedback:
      "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
  },
  {
    imgURL: customer2,
    customerName: "Lota Mongeskar",
    rating: 4.5,
    feedback:
      "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
  },
];

export const footerLinks = [
  {
    title: "Products",
    links: [
      {
        name: "TailwindCSS",
        link: "https://tailwindcss.com/docs/installation",
      },
      { name: "TailwindComponents", link: "https://tailwindui.com/" },
      { name: "Github Copilot", link: "https://github.com/features/copilot" },
      {
        name: "Design inspiration",
        link: "https://github.com/PranabKumarSahoo/nike-landing-page-react",
      },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "ashish080303@gmail.com", link: "mailto:ashish080303@gmail.com" },
      { name: "+91 7505009701", link: "tel:+917505009701" },
    ],
  },
];

export const socialMedia = [
  {
    src: <FaGithub />,
    alt: "Github logo",
    link: "https://github.com/Ash-0803",
  },
  {
    src: <FaTwitter />,
    alt: "twitter logo",
    link: "https://twitter.com/ashx083",
  },
  {
    src: <FaLinkedin />,
    alt: "Linkedin logo",
    link: "https://www.linkedin.com/in/ashx083",
  },
];
