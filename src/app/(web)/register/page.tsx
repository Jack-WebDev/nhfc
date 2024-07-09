"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type FormData = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  password: string;
  confirmPassword: string;
  ethnicity: string;
  gender: string;
};

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
    ethnicity: "",
    gender: "",
  });
  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = {
    //   email: "dakalo997@gmail.com",
    //   title: "Mr",
    //   firstName: "Dakalo",
    //   lastName: "Mbulaheni",
    //   ethnicity: "Black",
    //   phone: "07216554872",
    //   IdNumber: "46781386",
    //   role: "Admin",
    //   password: "dk970329",
    // };

    try {
      if (formData.password !== formData.confirmPassword) {
        setErrors("Passwords do not match");
      } else {
        setErrors(null);
        // Handle form submission logic
      }
      console.log(formData)
      const res = await axios.post(`/api/auth/register`, formData);
      console.log(res);
      if(res.status === 201) {
        router.push("/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 bg-[#F5F5F5] flex-col justify-center px-6 py-12 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account with us
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[40rem] bg-white p-8 rounded-xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center gap-x-4">
            <select
              name="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="border border-gray-400 rounded-xl p-2"
            >
              <option value="">Title</option>
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms.</option>
              <option value="Dr">Dr.</option>
            </select>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-400 rounded-xl p-2 w-full"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-400 rounded-xl p-2 w-full"
            />
          </div>
          <div className="flex items-center gap-x-4">
            <select
              name="ethnicity"
              value={formData.ethnicity}
              onChange={(e) => setFormData((prev) => ({ ...prev, ethnicity: e.target.value }))}
              className="border border-gray-400 rounded-xl p-2"
            >
              <option value="">Ethnicity</option>
              <option value="Black">Black</option>
              <option value="Coloured">Coloured</option>
              <option value="White">White</option>
              <option value="Indian">Indian</option>
              <option value="Asian">Asian</option>
            </select>
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
              className="border border-gray-400 rounded-xl p-2"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
            </select>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="Id Number"
              className="border border-gray-400 rounded-xl p-2 w-full"
              autoComplete="off"
            />
          </div>
          <div className="flex items-center gap-x-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-400 rounded-xl p-2 w-full"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border border-gray-400 rounded-xl p-2 w-full"
            />
          </div>
          <div className="flex items-center gap-x-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="border border-gray-400 rounded-xl p-2 w-full"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="border border-gray-400 rounded-xl p-2 w-full"
            />
          </div>
          <div>
            {errors && <p className="text-red-500">{errors}</p>}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-12 text-center">Already have an account? <Link href="/login" className="text-blue-500 underline">Login</Link></p>
      </div>
    </div>
  );
}
