import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import uuid from '../../utils/uuidv4';
import { SidebarCategory, SidebarItems } from './index.types';

interface SideBarProps {
  sidebarItems: SidebarItems;
  cta?: ReactNode;
}

const Sidebar = ({ sidebarItems, cta }: SideBarProps) => (
  <div className="w-64 h-screen bg-gray-600 text-white">
    <div className="h-20 bg-gray-700 flex items-center">
      <h1 className="text-xl font-bold ml-8">FINPAL</h1>
    </div>
    <nav className="flex flex-col space-y-2 text-gray-400">
      {sidebarItems.map((categories: SidebarCategory, index) => (
        <div
          key={uuid()}
          className={`flex flex-col py-8 px-4 space-y-1 ${index !== sidebarItems.length - 1 ? 'border-b border-gray-500' : 'border-b-0'}`}
        >
          {categories.map((category) => (
            <Link
              key={category.link}
              to={category.link}
              className="hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              {category.label}
            </Link>
          ))}
        </div>
      ))}
      {cta}
    </nav>
  </div>
);

export default Sidebar;
