import { useState } from "react";
import { Card, CardContent } from "./ui/card"; // Adjusted import path
import { Button } from "./ui/button"; // Adjusted import path
import { Input } from "./ui/input"; // Adjusted import path
import { Label } from "./ui/label"; // Adjusted import path
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"; // Adjusted import path
import { LoginForm } from './login-form'; // Importing the LoginForm component

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null; // Ensure modal is not rendered if not open

  return ( 
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <LoginForm /> {/* Integrating the LoginForm component */}
        </CardContent>
      </Card>
    </div>
  );
}
