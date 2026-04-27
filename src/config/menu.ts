import {
  HomeOutline,
  PeopleOutline,
  GridOutline,
  SettingsOutline,
} from "@vicons/ionicons5";
import { markRaw, type Component } from "vue";

export interface MenuItem {
  label: string;
  key: string;
  icon: Component;
  disabled?: boolean;
}

export const menuOptions: MenuItem[] = [
  {
    label: "Home",
    key: "home",
    icon: markRaw(HomeOutline),
  },
  {
    label: "Category",
    key: "category",
    icon: markRaw(GridOutline),
  },
  {
    label: "Profile",
    key: "profile",
    icon: markRaw(PeopleOutline),
  },
  {
    label: "Settings",
    key: "settings",
    icon: markRaw(SettingsOutline),
    disabled: true,
  },
];
