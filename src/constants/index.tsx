import {
  Bell,
  CreditCard,
  FileDuoToneBlack,
  Home,
  Settings,
} from "@/components/icons";
import CloudStorage from "@/components/icons/cloud";
import Starred from "@/components/icons/starred";
import Trash from "@/components/icons/trash";

export const MENU_ITEMS = (
  workspaceId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  { title: "Home", href: `/dashboard/${workspaceId}/home`, icon: <Home /> },
  {
    title: "My Clipvault",
    href: `/dashboard/${workspaceId}`,
    icon: <FileDuoToneBlack />,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceId}/notifications`,
    icon: <Bell />,
  },
  {
    title: "Starred",
    href: `/dashboard/${workspaceId}/starred`,
    icon: <Starred/>,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    icon: <CreditCard />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: <Settings />,
  },
  {
    title: "Storage",
    href: `/dashboard/${workspaceId}/storage`,
    icon: <CloudStorage/>,
  },  {
    title: "Trash",
    href: `/dashboard/${workspaceId}/trash`,
    icon: <Trash/>,
  },

];
