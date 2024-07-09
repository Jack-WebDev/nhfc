"use client";
import { staffLinks } from "@/utils";
import { NavLink } from "./NavLink";
import {
  UiContextType,
  UserContextType,
  useUiStateContext,
  useUserContext,
} from "@/context";
import { BookOpen, CarFront, FileText, HelpCircle, LayoutDashboard, MoveUpRightIcon, Newspaper, PenSquare, ShoppingBag, User, Users } from "lucide-react";
import { LinkType, NavLinkGroup } from "./navLinkGroup";

const Staff = () => {
  const { menu } = useUiStateContext() as UiContextType;
  const width = menu === "open" ? "full" : "fit";
  const display = menu === "open" ? "flex" : "hidden";
  const { data } = useUserContext() as UserContextType;

  const capturing: LinkType[] = [
    {
      id: "fa2eddc8-b06c-5200-99e7-82405c2d909c",
      title: "Accidents",
      Icon: CarFront ,
      url: "/dashboard/accidents"
    },
    {
      id: "8b43a13a-b229-503a-b19b-91a841ac29f1",
      title: "Books",
      Icon: BookOpen ,
      url: "/dashboard/capturing"
    },
  ] 
  const reports: LinkType[] = [
    {
      id: "b4d03dbf-d36c-558a-94a3-cfbf8d3bbac3",
      title: "Accidents",
      Icon: CarFront ,
      url: "/dashboard/accidentReports"
    },
    {
      id: "e7b1f0d9-5d7b-514c-9f9f-b4572d739e8b",
      title: "Books",
      Icon: BookOpen ,
      url: "/dashboard/batchReports"
    },
    {
      id: "7c1ad985-280f-5612-94cb-7b9d8d50a901",
      title: "Users",
      Icon: User ,
      url: "/dashboard/userReports"
    },
  ] 
  return (
    <div className="flex flex-col items-center md:items-start  px-0 md:px-0 pt-12 gap-2 w-full overflow-y-scroll scrollbar-hide  sticky top-0">
      {data?.role === "Data_Capture" ? (
        <>
        <NavLink url="/frontend" title="Dashboard" Icon={LayoutDashboard} />
        <NavLink url="/frontend/applications" title="My Applications" Icon={FileText} />
        <NavLink url="/dashboard/capturing" title="Our Products" Icon={ShoppingBag} />
        <NavLink url="/dashboard/capturing" title="Impact" Icon={MoveUpRightIcon} />
        <NavLink url="/dashboard/capturing" title="News and Media" Icon={Newspaper} />
        <NavLink url="/dashboard/capturing" title="Support" Icon={HelpCircle} />
        </>
      ) : null}
      {/* <NavLinkGroup links={capturing} title="Capturing" TitleIcon={PenSquare}/> */}
      {data?.role === "Admin" ? (
                <>
                <NavLink url="/dashboard" title="Dashboard" Icon={LayoutDashboard} />
                <NavLink url="/dashboard/applications" title="Applications" Icon={FileText} />
                <NavLink url="/dashboard/queries" title="Queries" Icon={HelpCircle} />
                <NavLink url="/dashboard/users" title="Users" Icon={Users} />
                </>
      ) : null}
      {/* <NavLinkGroup links={reports} title="Reports" TitleIcon={FileText}/> */}
      
    </div>
  );
};

export default Staff;
