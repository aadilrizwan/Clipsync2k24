import {
  Home,
  FolderOpen,
  Bell,
  Star,
  CreditCard,
  Settings,
  Cloud,
  Trash2,
} from "lucide-react";

export const MENU_ITEMS = (
  workspaceId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  { title: "Home", href: `/dashboard/${workspaceId}/home`, icon: <Home size={18} strokeWidth={2} /> },
  {
    title: "My Clipvault",
    href: `/dashboard/${workspaceId}`,
    icon: <FolderOpen size={18} strokeWidth={2} />,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceId}/notifications`,
    icon: <Bell size={18} strokeWidth={2} />,
  },
  {
    title: "Starred",
    href: `/dashboard/${workspaceId}/starred`,
    icon: <Star size={18} strokeWidth={2} />,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    icon: <CreditCard size={18} strokeWidth={2} />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: <Settings size={18} strokeWidth={2} />,
  },
  {
    title: "Storage",
    href: `/dashboard/${workspaceId}/storage`,
    icon: <Cloud size={18} strokeWidth={2} />,
  },  {
    title: "Trash",
    href: `/dashboard/${workspaceId}/trash`,
    icon: <Trash2 size={18} strokeWidth={2} />,
  },
];
