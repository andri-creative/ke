import { h, type Component } from "vue";
import { RouterLink } from "vue-router";
import { NIcon, type MenuOption } from "naive-ui";
import {
  HomeOutline,
  PeopleOutline,
  GridOutline,
  SettingsOutline,
} from "@vicons/ionicons5";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
          },
        },
        { default: () => "Home" }
      ),
    key: "home",
    icon: renderIcon(HomeOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "category",
          },
        },
        { default: () => "Category" }
      ),
    key: "category",
    icon: renderIcon(GridOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "profile",
          },
        },
        { default: () => "Profile" }
      ),
    key: "profile",
    icon: renderIcon(PeopleOutline),
  },
  // Item menu di bawah ini bisa ditambahkan nanti setelah rutenya dibuat di route.ts
  {
    label: "Settings",
    key: "settings",
    icon: renderIcon(SettingsOutline),
    disabled: true
  },
];
