"use client";

import { useState } from "react";
import { CardComponent } from "../_components/Cards";
import { InternalAudit } from "../_components/InternalAudit";
import { ObjectivesCard } from "../_components/Objectives";

export default function Objectives() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ObjectivesCard header="I.T" />
      <ObjectivesCard header="Finance" />
      <ObjectivesCard header="H.R" />
      <ObjectivesCard header="Operations" />
    </div>
  );
}
