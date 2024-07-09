"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "@/lib/apiUrl";
import {
  Form,
  Loader,
  ResponseMessage,
  Button,

} from "@/components";



import { DriverSchemaType, driverSchema } from "@/schema";
import { InjuredPassenger } from "./injuredPassengers";
import { PassengerFormTabs } from "../tabs/passengerFormTabs";

export function PassengerForm() {
  


  
  return (
    

        <PassengerFormTabs />

       
  );
}
