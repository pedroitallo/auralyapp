import React from "react";
import { Moon, Heart } from "lucide-react";

export default function Journey() {
  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-2">
            <Moon className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-light text-white">Spiritual Journey</h1>
            <Heart className="w-6 h-6 text-pink-300" />
          </div>
          <p className="text-purple-200 text-sm">
            Reflect on your path and inner growth
          </p>
        </div>
      </div>
    </div>
  );
}