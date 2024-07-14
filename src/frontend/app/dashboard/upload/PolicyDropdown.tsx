import { Policy } from '@/data/interface/file';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useState, useRef, useEffect } from 'react';


interface PolicyDropdownProps {
  policies: Policy[];
  value: Policy | null;
  onChange: (policy: Policy) => void;
}

const PolicyDropdown: React.FC<PolicyDropdownProps> = ({ policies, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (policy: Policy) => {
    onChange(policy);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <button type="button" className="p-2 cursor-pointer border-black border w-full flex flex-row justify-between items-center rounded-md text-sm" onClick={() => setIsOpen(!isOpen)}>
        {value ? value.name : 'Select a policy'}
        <ChevronDownIcon className="w-5 h-5"/>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 z-50 block py-1 border-2 border-solid border-gray-300 w-full bg-white max-h-56 overflow-y-auto rounded-b-md">
          {policies.map((policy) => (
            <div key={policy.id} className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleOptionClick(policy)}>
              <div className="font-bold">{policy.name}</div>
              <div className="text-xs text-gray-700 line-clamp-2">{policy.description}</div>
            </div>
          ))}
        </div>
      )}
     </div>
    );
}

export default PolicyDropdown;
