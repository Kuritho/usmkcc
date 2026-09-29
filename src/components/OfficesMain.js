// OfficesMain.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OfficesList from './OfficesList';
import OfficeDetails from './OfficeDetails';

const OfficesMain = () => {
  return (
    <Routes>
      <Route index element={<OfficesList />} />
      <Route path=":officeId" element={<OfficeDetails />} />
    </Routes>
  );
};

export default OfficesMain;