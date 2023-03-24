import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NotFoundPage from './pages/NotFound';
import Forms from './pages/Form';
import FormPage from './pages/Form';

const enum AppRoutes {
  main = '/',
  about = '/about',
  not_found = '/404',
  form = '/form',
}

export const headerData = [
  {
    title: 'Home',
    path: AppRoutes.main,
  },
  {
    title: 'About',
    path: AppRoutes.about,
  },
  {
    title: 'Form',
    path: AppRoutes.form,
  },
];

class Router extends React.Component {
  render() {
    return (
      <Routes>
        <Route path={AppRoutes.main} element={<HomePage />} />
        <Route path={AppRoutes.about} element={<AboutPage />} />
        <Route path={AppRoutes.not_found} element={<NotFoundPage />} />
        <Route path={AppRoutes.form} element={<FormPage />} />
        <Route path="*" element={<Navigate replace to={AppRoutes.not_found} />} />
      </Routes>
    );
  }
}

export default Router;
