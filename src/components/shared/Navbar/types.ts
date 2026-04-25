export interface NavLink {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface Category {
  label: string;
  href: string;
  icon?: string;
  subcategories?: { label: string; href: string }[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface NavbarProps {
  categories?: Category[];
  showTopBar?: boolean;
  showSearch?: boolean;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export interface CategoryMenuProps {
  categories: Category[];
}