"use client";

import TopBar from "./TopBar";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import type { NavbarProps } from "./types";
import { Home, Info, Phone, Pill } from "lucide-react";

// ✅ MediStore Public Links
const defaultPublicLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: Pill },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

// ✅ MediStore Categories (Medicine Shop)
const defaultCategories = [
  {
    label: "💊 Pain Relief",
    href: "/category/pain-relief",
    
    subcategories: [
      { label: "Headache", href: "/category/pain-relief/headache" },
      { label: "Muscle Pain", href: "/category/pain-relief/muscle-pain" },
      { label: "Arthritis", href: "/category/pain-relief/arthritis" },
      { label: "Toothache", href: "/category/pain-relief/toothache" },
    ],
  },
  {
    label: "🤧 Cold & Flu",
    href: "/category/cold-flu",
   
    subcategories: [
      { label: "Cough Syrup", href: "/category/cold-flu/cough" },
      { label: "Fever", href: "/category/cold-flu/fever" },
      { label: "Sore Throat", href: "/category/cold-flu/sore-throat" },
      { label: "Nasal Spray", href: "/category/cold-flu/nasal-spray" },
    ],
  },
  {
    label: "💪 Vitamins",
    href: "/category/vitamins",
   
    subcategories: [
      { label: "Vitamin C", href: "/category/vitamins/vitamin-c" },
      { label: "Vitamin D", href: "/category/vitamins/vitamin-d" },
      { label: "Vitamin B12", href: "/category/vitamins/vitamin-b12" },
      { label: "Multivitamin", href: "/category/vitamins/multivitamin" },
    ],
  },
  {
    label: "🍽️ Digestive Health",
    href: "/category/digestive",
   
    subcategories: [
      { label: "Antacids", href: "/category/digestive/antacids" },
      { label: "Probiotics", href: "/category/digestive/probiotics" },
      { label: "Digestive Enzymes", href: "/category/digestive/enzymes" },
    ],
  },
  {
    label: "🩹 First Aid",
    href: "/category/first-aid",
   
    subcategories: [
      { label: "Bandages", href: "/category/first-aid/bandages" },
      { label: "Antiseptic", href: "/category/first-aid/antiseptic" },
      { label: "Pain Relief Spray", href: "/category/first-aid/spray" },
    ],
  },
  {
    label: "🌿 Allergy",
    href: "/category/allergy",
   
    subcategories: [
      { label: "Antihistamines", href: "/category/allergy/antihistamines" },
      { label: "Nasal Sprays", href: "/category/allergy/nasal-sprays" },
      { label: "Eye Drops", href: "/category/allergy/eye-drops" },
    ],
  },
  {
    label: "🩺 Diabetes Care",
    href: "/category/diabetes",
    
    subcategories: [
      { label: "Glucose Meters", href: "/category/diabetes/meters" },
      { label: "Test Strips", href: "/category/diabetes/strips" },
      { label: "Insulin", href: "/category/diabetes/insulin" },
    ],
  },
  {
    label: "🧴 Skin Care",
    href: "/category/skin-care",
    subcategories: [
      { label: "Moisturizers", href: "/category/skin-care/moisturizers" },
      { label: "Acne Treatment", href: "/category/skin-care/acne" },
      { label: "Sunscreen", href: "/category/skin-care/sunscreen" },
    ],
  },
];

export default function Navbar({
  categories = defaultCategories,
  showTopBar = true,
}: NavbarProps) {
  const cartCount = 0;
  const wishlistCount = 0;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      {showTopBar && <TopBar />}

      <DesktopNav
        publicLinks={defaultPublicLinks}
        categories={categories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <MobileNav
        publicLinks={defaultPublicLinks}
        categories={categories}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </header>
  );
}