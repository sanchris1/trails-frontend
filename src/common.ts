import {
  LayoutDashboard,
  Map,
  Mountain,
  Image,
  Tag,
  CalendarCheck,
  Users,
  CreditCard,
  UserRound,
  Heart,
  Star,
  Bell,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  Settings,
  CircleHelp,
  LogOut,
  type LucideIcon,
  User,
  SunMoon,
  BookOpen,
  MessageCircle,
} from "lucide-react";

export interface SidebarItem {
  id: number;
  title: string;
  href: string;
  icon: LucideIcon;
  section:
    | "Main"
    | "Adventure Management"
    | "Bookings"
    | "Customers"
    | "Operations"
    | "Administration"
    | "Account";
}

export const sidebarItems: SidebarItem[] = [
  // Main
  {
    id: 1,
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    section: "Main",
  },

  // Adventure Management
  {
    id: 2,
    title: "Adventures",
    href: "/admin/adventures",
    icon: Map,
    section: "Adventure Management",
  },
  {
    id: 3,
    title: "Expeditions",
    href: "/admin/expeditions",
    icon: Mountain,
    section: "Adventure Management",
  },
  {
    id: 4,
    title: "Gallery",
    href: "/admin/gallery",
    icon: Image,
    section: "Adventure Management",
  },
  {
    id: 5,
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
    section: "Adventure Management",
  },

  // Bookings
  {
    id: 6,
    title: "Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
    section: "Bookings",
  },
  {
    id: 7,
    title: "Participants",
    href: "/admin/participants",
    icon: Users,
    section: "Bookings",
  },
  {
    id: 8,
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
    section: "Bookings",
  },

  // Customers
  {
    id: 9,
    title: "Users",
    href: "/admin/users",
    icon: UserRound,
    section: "Customers",
  },
  {
    id: 10,
    title: "Favorites",
    href: "/admin/favorites",
    icon: Heart,
    section: "Customers",
  },
  {
    id: 11,
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
    section: "Customers",
  },

  // Operations
  {
    id: 12,
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    section: "Operations",
  },
  {
    id: 13,
    title: "Reports",
    href: "/admin/reports",
    icon: ClipboardList,
    section: "Operations",
  },
  {
    id: 14,
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    section: "Operations",
  },

  // Administration
  {
    id: 15,
    title: "Roles & Permissions",
    href: "/admin/roles",
    icon: ShieldCheck,
    section: "Administration",
  },
  {
    id: 16,
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    section: "Administration",
  },

  // Account
  {
    id: 17,
    title: "Help",
    href: "/admin/help",
    icon: CircleHelp,
    section: "Account",
  },
  {
    id: 18,
    title: "Logout",
    href: "/logout",
    icon: LogOut,
    section: "Account",
  },
];

export const adminProfileMenu = [
  {
    id: "account",
    title: "Account",
    items: [
      {
        id: 1,
        title: "My Profile",
        href: "/admin/profile",
        icon: User,
      },
      {
        id: 2,
        title: "Account Settings",
        href: "/admin/settings",
        icon: Settings,
      },
      {
        id: 3,
        title: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
      },
      {
        id: 4,
        title: "Appearance",
        action: "theme",
        icon: SunMoon,
      },
    ],
  },

  {
    id: "support",
    title: "Support",
    items: [
      {
        id: 5,
        title: "Help Center",
        href: "/admin/help",
        icon: CircleHelp,
      },
      {
        id: 6,
        title: "Documentation",
        href: "/admin/docs",
        icon: BookOpen,
      },
      {
        id: 7,
        title: "Contact Support",
        href: "/admin/support",
        icon: MessageCircle,
      },
    ],
  },

  {
    id: "session",
    title: "Session",
    items: [
      {
        id: 8,
        title: "Log Out",
        action: "logout",
        icon: LogOut,
        destructive: true,
      },
    ],
  },
];
