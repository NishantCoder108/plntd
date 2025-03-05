"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, User } from "lucide-react";
import Image from "next/image";

// Define the type for form data
interface WalletProfileFormData {
  name: string;
  walletAddress: string;
  solAmount: string;
  profileImage: string | null;
}

export default function AppForm() {
  // Use the defined interface for state
  const [formData, setFormData] = useState<WalletProfileFormData>({
    name: "",
    walletAddress: "",
    solAmount: "",
    profileImage: null,
  });

  // Typed event handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.walletAddress.startsWith("")) {
      alert("Please enter a valid Solana wallet address");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Form Submitted:", formData);

    // Example of what you might do with the data
    alert("Profile Submitted!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Solana Wallet Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="profileImage" className="cursor-pointer">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center hover:border-blue-500 transition">
                  {formData.profileImage ? (
                    <Image
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
              </Label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("profileImage")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Wallet Address Input */}
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Solana Wallet Address</Label>
              <Input
                type="text"
                id="walletAddress"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleInputChange}
                placeholder="Enter your Solana wallet address"
                required
              />
            </div>

            {/* SOL Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="solAmount">SOL Amount</Label>
              <Input
                type="number"
                id="solAmount"
                name="solAmount"
                value={formData.solAmount}
                onChange={handleInputChange}
                placeholder="Enter SOL amount"
                min="0"
                step="0.1"
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              BUY PLNTD
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
