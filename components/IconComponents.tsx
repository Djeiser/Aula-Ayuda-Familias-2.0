
import React from 'react';

export const SendIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-6 h-6'}>
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

export const FriendlyBotIcon = ({ className }: { className?: string }) => (
    <div className={`flex items-center justify-center bg-blue-500 rounded-full ${className || 'w-10 h-10'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-3l-1 -1v-3l1 -1v-1a2 2 0 0 1 2 -2z" />
            <path d="M10 16h4" />
            <circle cx="8.5" cy="11.5" r=".5" fill="currentColor" />
            <circle cx="15.5" cy="11.5" r=".5" fill="currentColor" />
            <path d="M9 7l-1 -4" />
            <path d="M15 7l1 -4" />
        </svg>
    </div>
);

export const FamilyIcon = ({ className }: { className?: string }) => (
     <div className={`flex items-center justify-center bg-orange-400 rounded-full ${className || 'w-10 h-10'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M12 21c-2.4 0 -4.5 -2.015 -5 -4.5c-.063 -.598 .363 -1.5 1.5 -1.5h7c1.137 0 1.563 .902 1.5 1.5c-.5 2.485 -2.6 4.5 -5 4.5z" />
            <path d="M15.35 15.35a2 2 0 1 0 2.15 2.15" />
            <path d="M8.65 15.35a2 2 0 1 1 -2.15 2.15" />
            <path d="M12 4a2 2 0 1 0 0 4a2 2 0 0 0 0 -4z" />
        </svg>
    </div>
);

export const SchoolIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || 'w-6 h-6'}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

export const SuggestionIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || 'w-6 h-6'}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.355a7.5 7.5 0 0 1-3 0m3 0a7.5 7.5 0 0 0-3 0m-9.75 0h9.75M9 13.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" />
    </svg>
);
