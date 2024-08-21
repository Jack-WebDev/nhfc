"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaLock } from "react-icons/fa";

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
    try {
      if (formData.password !== formData.confirmPassword) {
        setErrors("Passwords do not match");
      } else {
        setErrors(null);
      }
      // console.log(formData);
      const res = await axios.post(`/api/auth/register`, formData);
      // console.log(res);
      if (res.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <Image
            width={200}
            height={200}
            alt="logo image"
            src="/s-logo.png"
            className="mb-2 rounded-lg w-20 h-20"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Register your account with us
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <select
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-1/3 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            >
              <option value="">Title</option>
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms.</option>
              <option value="Dr">Dr.</option>
            </select>
            <div className="relative w-1/3">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="pl-10 w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              />
            </div>
            <div className="relative w-1/3">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="pl-10 w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <select
              name="ethnicity"
              value={formData.ethnicity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ethnicity: e.target.value }))
              }
              className="w-1/2 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="w-1/2 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
            </select>
          </div>
          <div className="relative mb-4">
            <FaIdCard className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="ID Number"
              className="pl-10 w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="pl-10 w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>
          <div className="relative mb-4">
            <FaPhone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="pl-10 w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="pl-10 w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="pl-10 w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>
          {errors && <p className="text-red-500 text-center">{errors}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-md hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}
