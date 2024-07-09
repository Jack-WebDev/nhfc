"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import { NavLink } from "./NavLink";
import { BookOpenText, CarFront, PenSquare } from "lucide-react";
import { UiContextType, useUiStateContext } from "@/context";
import { JSXElementConstructor, useState } from "react";

export const NavLinkGroup = (props: NavLinkGroupProps) => {
  const { menu } = useUiStateContext() as UiContextType;
  const display = menu === "open" ? "flex" : "hidden";
  const { title, TitleIcon, links } = props;
  return (
    <div className="w-full z-10000 text-gray-500">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none ">
          <AccordionTrigger className="bg-white  pr-2 h-9 hover:no-underline">
            <div className="flex items-center gap-2 font-normal text-sm px-4 md:px-8 w-full">
              <TitleIcon size={18} />{" "}
              <p className={`hidden md:${display}`}>{title}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {links.map((link) => (
              <NavLink url={link.url} title={link.title} Icon={link.Icon} key={link.id}/>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

type NavLinkGroupProps = {
  title: string;
  TitleIcon: React.ElementType;
  links: LinkType[];
};

export type LinkType = {
  url: string;
  title: string;
  Icon: React.ElementType;
  id: string
};
