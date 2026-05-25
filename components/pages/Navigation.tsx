'use client';

import { Home, Compass, User } from 'lucide-react';

export default function Navigation() {
  return (
    <>
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-24 flex-col items-center bg-purple-primary py-10 border-r border-border z-50 overflow-hidden">
        <div className="mb-12">
          <div className="text-2xl font-bold">VideoFeed</div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center cursor-pointer text-white">
            <Home className="w-8 h-8" />
            <span className="text-sm mt-2 font-medium">Home</span>
          </div>
          
          <div className="flex flex-col items-center cursor-pointer text-black-third hover:text-white transition-colors">
            <Compass className="w-8 h-8" />
            <span className="text-sm mt-2">Explore</span>
          </div>
          
          <div className="flex flex-col items-center cursor-pointer text-black-third hover:text-white transition-colors">
            <User className="w-8 h-8" />
            <span className="text-sm mt-2">Profile</span>
          </div>
        </div>
      </div>


      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-border z-50">
        <div className="flex justify-around py-3">
          <div className="flex flex-col items-center text-white">
            <Home className="w-6 h-6" />
            <span className="text-[10px] mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center text-black-third hover:text-white transition-colors">
            <Compass className="w-6 h-6" />
            <span className="text-[10px] mt-1">Explore</span>
          </div>
          <div className="flex flex-col items-center text-black-third hover:text-white transition-colors">
            <User className="w-6 h-6" />
            <span className="text-[10px] mt-1">Hồ sơ</span>
          </div>
        </div>
      </div>
    </>
  );
}