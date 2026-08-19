import {
  LayoutDashboard,
  Map,
  Mountain,
  Image,
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
  BookOpen,
  MessageCircle,
  Compass,
  CalendarDays,
  Backpack,
  ShoppingBag,
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
];

export const dashboardStats = [
  {
    id: 1,
    title: "Total Adventures",
    value: 142,
    icon: Compass,
    change: 4,
    trend: "up",
    chart: "line",
    highlighted: false,
  },
  {
    id: 2,
    title: "Active Expeditions",
    value: 28,
    icon: CalendarDays,
    change: 12,
    trend: "up",
    chart: "line",
    highlighted: false,
  },
  {
    id: 3,
    title: "Bookings Today",
    value: 156,
    icon: CreditCard,
    change: 24,
    trend: "up",
    chart: "line",
    highlighted: true,
  },
  {
    id: 4,
    title: "Active Travelers",
    value: 342,
    icon: Users,
    change: 1,
    trend: "up",
    chart: "line-muted",
    highlighted: false,
  },
  {
    id: 5,
    title: "MTD Revenue",
    value: 124500,
    prefix: "$",
    suffix: "K",
    displayValue: "$124.5K",
    icon: Backpack,
    change: 18,
    trend: "up",
    chart: "bar",
    highlighted: false,
  },
  {
    id: 6,
    title: "Average Rating",
    value: 4.92,
    max: 5,
    icon: Star,
    change: null,
    trend: null,
    stars: 4.92,
    chart: "rating",
    highlighted: false,
  },
];

export const categories = [
  { label: "Hiking", value: "hiking" },
  { label: "Camping", value: "camping" },
  { label: "Backpacking", value: "backpacking" },
  { label: "Trail Running", value: "trail-running" },
  { label: "Rock Climbing", value: "rock-climbing" },
  { label: "Mountain Biking", value: "mountain-biking" },
  { label: "Wildlife Watching", value: "wildlife-watching" },
  { label: "Nature Walks", value: "nature-walks" },
  { label: "Waterfalls", value: "waterfalls" },
  { label: "Mountain Peaks", value: "mountain-peaks" },
  { label: "Forest Trails", value: "forest-trails" },
  { label: "Scenic Views", value: "scenic-views" },
];

export const difficulties = [
  { label: "Easy", value: "easy" },
  { label: "Moderate", value: "moderate" },
  { label: "Hard", value: "hard" },
  { label: "Extreme", value: "extreme" },
];

export const expeditionStatuses = [
  { value: "scheduled", label: "Scheduled" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export const expeditionSortOptions = [
  {
    value: "departure_asc",
    label: "Departure: Soonest first",
  },
  {
    value: "departure_desc",
    label: "Departure: Latest first",
  },
  {
    value: "created_desc",
    label: "Recently created",
  },
  {
    value: "created_asc",
    label: "Oldest created",
  },
  {
    value: "title_asc",
    label: "Adventure: A–Z",
  },
  {
    value: "title_desc",
    label: "Adventure: Z–A",
  },
];
export const userNavItems = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "adventures",
    label: "Adventures",
    href: "/adventures",
  },
  {
    id: "expeditions",
    label: "Expeditions",
    href: "/expeditions",
  },
  {
    id: "gallery",
    label: "Gallery",
    href: "/gallery",
  },
  {
    id: "shop",
    label: "Shop",
    href: "/shop",
  },
  {
    id: "about",
    label: "About",
    href: "/about",
  },
] as const;

export const profileMenuItems = [
  {
    id: "profile",
    label: "My Profile",
    href: "/profile",
    icon: User,
  },
  {
    id: "adventures",
    label: "My Adventures",
    href: "/profile/adventures",
    icon: Compass,
  },
  {
    id: "orders",
    label: "My Orders",
    href: "/profile/orders",
    icon: ShoppingBag,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/profile/settings",
    icon: Settings,
  },
];
