import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Users, Briefcase, FileText, BarChart3, Edit3, Image, Shield } from 'lucide-react';
import { AdminDashboard } from '../../../pages/v3/Admin/AdminDashboard';
import { BookingsManager } from '../../../pages/v3/Admin/BookingsManager';
import { CrmManager } from '../../../pages/v3/Admin/CrmManager';
import { EmployeeManager } from '../../../pages/v3/Admin/EmployeeManager';
import { InvoiceManager } from '../../../pages/v3/Admin/InvoiceManager';
import { AnalyticsReports } from '../../../pages/v3/Admin/AnalyticsReports';
import { BlogCMS } from '../../../pages/v3/Admin/BlogCMS';
import { GalleryManager } from '../../../pages/v3/Admin/GalleryManager';
import { RolesSettings } from '../../../pages/v3/Admin/RolesSettings';


export const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers (CRM)', icon: <Users className="w-4 h-4" /> },
    { id: 'employees', label: 'Employees', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'blogs', label: 'Blog CMS', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery WebP', icon: <Image className="w-4 h-4" /> },
    { id: 'roles', label: 'Roles & Security', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 font-poppins">
      {/* Admin Sidebar / Top Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-2 bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Render Area */}
      <div>
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'bookings' && <BookingsManager />}
        {activeTab === 'customers' && <CrmManager />}
        {activeTab === 'employees' && <EmployeeManager />}
        {activeTab === 'invoices' && <InvoiceManager />}
        {activeTab === 'analytics' && <AnalyticsReports />}
        {activeTab === 'blogs' && <BlogCMS />}
        {activeTab === 'gallery' && <GalleryManager />}
        {activeTab === 'roles' && <RolesSettings />}
      </div>
    </div>
  );
};
