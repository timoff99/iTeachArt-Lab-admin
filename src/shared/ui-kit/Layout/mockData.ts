import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CookieIcon from "@mui/icons-material/Cookie";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import SettingsIcon from "@mui/icons-material/Settings";

import { ROUTE_NAMES } from "../../../router/routeNames";

export const menu = [
  { text: "Users", Icon: GroupIcon, selected: false, href: ROUTE_NAMES.HOME },
  { text: "Statistics", Icon: VisibilityIcon, selected: false, href: ROUTE_NAMES.STATISTICS },
  { text: "Cookbooks", Icon: MenuBookIcon, selected: false, href: ROUTE_NAMES.COOKBOOKS },
  { text: "Recipes", Icon: CookieIcon, selected: false, href: ROUTE_NAMES.RECIPES },
  { text: "Collections", Icon: ViewHeadlineIcon, selected: false, href: ROUTE_NAMES.COLLECTIONS },
  { text: "Settings", Icon: SettingsIcon, selected: false, href: ROUTE_NAMES.SETTINGS },
];
