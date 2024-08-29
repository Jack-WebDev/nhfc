"use client";
import { staffLinks } from "@/utils";
import { NavLink } from "./NavLink";
import {
  UiContextType,
  UserContextType,
  useUiStateContext,
  useUserContext,
} from "@/context";
import {
  BookOpen,
  CarFront,
  FileBarChart,
  FileText,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  MoveUpRightIcon,
  Newspaper,
  PenSquare,
  Settings,
  ShoppingBag,
  User,
  Users,
  SquareGanttChart
} from "lucide-react";
import { LinkType, NavLinkGroup } from "./navLinkGroup";

const Staff = () => {
  const { menu } = useUiStateContext() as UiContextType;
  const width = menu === "open" ? "full" : "fit";
  const display = menu === "open" ? "flex" : "hidden";
  const { data } = useUserContext() as UserContextType;


  return (
    <div className="flex flex-col items-center md:items-start  px-0 md:px-0 pt-12 gap-2 w-full overflow-y-scroll scrollbar-hide  sticky top-0">
      {data?.role === "Client" ? (
        <>
          <NavLink url="/frontend" title="My Applications" Icon={FileText} />
          <NavLink url="/frontend/queries" title="Messaging Center" Icon={HelpCircle} />
          <NavLink
            url="/frontend/projects"
            title="NHFC Projects"
            Icon={ShoppingBag}
          />
          <NavLink
            url="/dashboard/impact"
            title="Impact"
            Icon={MoveUpRightIcon}
          />
          <NavLink
            url="/dashboard/news"
            title="News and Media"
            Icon={Newspaper}
          />
          <NavLink url="/dashboard/support" title="Support" Icon={HelpCircle} />
        </>
      ) : null}
      {/* <NavLinkGroup links={capturing} title="Capturing" TitleIcon={PenSquare}/> */}
      {data?.role === "Admin" ? (
        <>
          <NavLink url="/dashboard" title="Dashboard" Icon={LayoutDashboard} />
          <NavLink
            url="/dashboard/applications"
            title="Applications"
            Icon={FileText}
          />
          <NavLink
            url="/dashboard/projects"
            title="Projects"
            Icon={FolderKanban}
          />
          <NavLink url="/dashboard/queries" title="Messaging Center" Icon={HelpCircle} />
          <NavLink url="/dashboard/erm" title="ERM" Icon={SquareGanttChart} />

          <NavLink
            url="/dashboard/queries"
            title="Reports"
            Icon={FileBarChart}
          />

          <NavLink url="/dashboard/users" title="Users" Icon={Users} />
          <NavLink url="/dashboard/queries" title="Settings" Icon={Settings} />
        </>
      ) : null}
      {/* <NavLinkGroup links={reports} title="Reports" TitleIcon={FileText}/> */}
    </div>
  );
};

export default Staff;
