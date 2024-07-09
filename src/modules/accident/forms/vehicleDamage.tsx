"use client";
import React, { useState } from "react";
import { vehicleDamage } from "..";
import { Checkbox, FormInput, FormLabel, Label } from "@/components";

export const VehicleDamage = (props: VehicleDamageProps) => {
  
  const {setDamage } = props;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {

  
    if(e.target.checked === true) {

      setDamage((prev: string[]) => prev.concat(e.target.value));
    } else {

        setDamage((prev: string[]) => prev.filter((item) => item !== e.target.value))
      
    }
  }


  return (
    <div className="flex flex-col gap-2">
      <FormLabel className="text-black">Damage:</FormLabel>
      {vehicleDamage.map((damage) => (
        <div className="flex items-center gap-2" key={damage.id}>
          <input
          id={damage.id}
            type="checkbox"
            value={damage.value}
            name={damage.title}
            onChange={(e) => handleChange(e)}
            
          />
          <Label>{damage.title}</Label>
        </div>
      ))}
    </div>
  );
};

type VehicleDamageProps = {
  setDamage: React.Dispatch<React.SetStateAction<string[]>>;
};
