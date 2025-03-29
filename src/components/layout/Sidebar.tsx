import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building,
  TrendingUp,
  Users,
  GitCompare,
  School,
  UserCog,
  ClipboardList,
  Settings,
  GraduationCap,
  FileSpreadsheet,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Brain
} from 'lucide-react';

const navigation = [
  {
    name: 'Analytics Dashboard',
    icon: LayoutDashboard,
    items: [
      { name: 'Overview', href: '/', icon: LayoutDashboard },
      { name: 'Infrastructure', href: '/facilities', icon: Building },
      { name: 'Performance', href: '/performance', icon: TrendingUp },
      { name: 'Demographics', href: '/demographics', icon: Users },
      { name: 'Compare & Analyze', href: '/compare', icon: GitCompare },
      { name: 'Predictive Analytics', href: '/predictive', icon: Brain }
    ]
  },
  {
    name: 'Academic Records',
    icon: BookOpen,
    items: [
      { name: 'Term Enrollment', href: '/academic-records/enrollment', icon: Users },
      { name: 'Board Exam Results', href: '/academic-records/exam-results', icon: FileSpreadsheet }
    ]
  },
  {
    name: 'Management',
    icon: Settings,
    items: [
      { name: 'Schools', href: '/schools', icon: School },
      { name: 'Staff', href: '/staff', icon: GraduationCap },
      { name: 'Grading Schemes', href: '/grading-schemes', icon: GraduationCap },
      { name: 'Users', href: '/users', icon: UserCog }
    ]
  },
  {
    name: 'Administration',
    icon: ClipboardList,
    items: [
      { name: 'States', href: '/states', icon: Building },
      { name: 'LGAs', href: '/lgas', icon: Building },
      { name: 'Senatorial Districts', href: '/senatorial-districts', icon: Building },
      { name: 'School Types', href: '/school-types', icon: School },
      { name: 'Status Types', href: '/status-types', icon: FileSpreadsheet },
      { name: 'Board Exams', href: '/board-exams', icon: ClipboardList }
    ]
  }
];

export const Sidebar = () => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(navigation.map(n => n.name));
  const [expandedSubItems, setExpandedSubItems] = useState<string[]>([]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupName)
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  const toggleSubItems = (itemName: string) => {
    setExpandedSubItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Campus Dashboard</h1>
      </div>
      <nav className="mt-6 px-4">
        {navigation.map((group) => (
          <div key={group.name} className="mb-4">
            <button
              onClick={() => toggleGroup(group.name)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center">
                <group.icon className="h-5 w-5 mr-3 text-gray-500" />
                {group.name}
              </div>
              {expandedGroups.includes(group.name) ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
            {expandedGroups.includes(group.name) && (
              <div className="mt-1 space-y-1 pl-10">
                {group.items.map((item) => (
                  <div key={item.name}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleSubItems(item.name)}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                          </div>
                          {expandedSubItems.includes(item.name) ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                        {expandedSubItems.includes(item.name) && (
                          <div className="pl-8 space-y-1">
                            {item.subItems.map((subItem) => (
                              <NavLink
                                key={subItem.name}
                                to={subItem.href}
                                className={({ isActive }) =>
                                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    isActive
                                      ? 'bg-indigo-600 text-white'
                                      : 'text-gray-700 hover:bg-gray-100'
                                  }`
                                }
                              >
                                {subItem.icon && <subItem.icon className="mr-3 h-5 w-5" />}
                                {subItem.name}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};