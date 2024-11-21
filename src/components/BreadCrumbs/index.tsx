import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  breadcrumbs: { id: string; name: string; href: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  const navigate = useNavigate();
  return breadcrumbs.map((item, index) => {
    if (index === 0) {
      return (
        <li
          key={`li-${item.id}`}
          className="flex items-center gap-1"
          onClick={() => navigate(item.href)}
        >
          <svg
            fill="currentColor"
            width={16}
            height={20}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="pt-1"
          >
            <g data-name="Layer 2" id="Layer_2">
              <path d="M13,26a1,1,0,0,1-.71-.29l-9-9a1,1,0,0,1,0-1.42l9-9a1,1,0,1,1,1.42,1.42L5.41,16l8.3,8.29a1,1,0,0,1,0,1.42A1,1,0,0,1,13,26Z" />
              <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
            </g>
          </svg>
          <span
            key={`span-${item.id}`}
            className="mr-2 text-lg font-medium text-gray-900 hover:cursor-pointer hover:underline"
          >
            {item.name}
          </span>
        </li>
      );
    }
    return (
      <>
        {index !== breadcrumbs.length && (
          <svg
            key={`svg-${item.id}`}
            fill="currentColor"
            width={16}
            height={20}
            viewBox="0 0 16 20"
            aria-hidden="true"
            className="h-5 w-4 text-gray-300"
          >
            <path
              key={`path-${item.id}`}
              d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"
            />
          </svg>
        )}
        <li key={`li-${item.id}`} className="text-sm">
          <span
            key={`span-${item.id}`}
            aria-current="page"
            className="font-medium text-gray-500 hover:cursor-default"
            onClick={() => navigate(item.href)}
          >
            {item.name}
          </span>
        </li>
      </>
    );
  });
};
