import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EntryExitLayout from '../EntryExitLayout/EntryExitLayout';
import GowningLayout from '../GowningLayout/GowningLayout';
import SubLayout from '../SubLayout/SubLayout';
import SummaryLayout from '../SummaryLayout/SummaryLayout';
import DashboardLayout from '../DashboardLayout/DashboardLayout';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<DashboardLayout />} />
      <Route path="entry-exit" element={<EntryExitLayout />} />
      <Route path="gowning" element={<GowningLayout />} />
      <Route path="sub" element={<SubLayout />} />
      <Route path="summary/:pageType/:username/:date_time/:id" element={<SummaryLayout />} />
      {/* Redirect to '/home' if no matching route */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AuthRoutes;
