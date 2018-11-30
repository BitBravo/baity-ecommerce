import React, { Component } from 'react';
import Loadable from 'react-loadable';

import Home from 'views/Home';
import { MyCart } from 'views/MyCart';

import Login from 'views/Login';
import Logout from 'views/Logout';
import Registration from 'views/Registration';
import RegisterPro from 'views/RegisterPro';
import RegisterNormal from 'views/RegisterNormal';
import PasswordReset from 'views/PasswordReset';

import IdeasPage from 'views/IdeasPage';
import IdeaDetails from 'views/IdeaDetails';
import BusinessIdeas from 'views/BusinessIdeas';
import MyIdeaList from 'views/MyIdeaList';
import FavIdeas from 'views/FavIdeas';
import IdeaUpdater from 'views/IdeaUpdater';

import ProductsPage from 'views/ProductsPage';
import ProductDetails from 'views/ProductDetails';
import BusinessProducts from 'views/BusinessProducts';
import MyProductList from 'views/MyProductList';
import FavProducts from 'views/FavProducts';
import ProductUpdater from 'views/ProductUpdater';


// user profile pages
import MyAccount from 'views/MyAccount';
import BusinessProfile from 'views/BusinessProfile';
import ProfProfileUpdater from 'views/ProfProfileUpdater';
import NorProfileUpdater from 'views/NorProfileUpdater';

import Page404 from 'views/Page404';
import Page500 from 'views/Page500';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

const DefaultLayout = Loadable({
  loader: () => import('containers/Home'),
  loading
})

const AdminLayout = Loadable({
  loader: () => import('containers/Admin'),
  loading,
})

export const routes = {
  publicRoutes: [
    {
      component: Home,
      path: '/',
      layout: DefaultLayout,
    },
    {
      component: Login,
      path: '/login',
      layout: DefaultLayout
    },
    {
      component: Registration,
      path: '/registration',
      layout: DefaultLayout
    },
    {
      component: RegisterPro,
      path: '/registerProf',
      layout: DefaultLayout
    },
    {
      component: RegisterNormal,
      path: '/registerNormal',
      layout: DefaultLayout
    },
    {
      component: PasswordReset,
      path: '/resetpassword',
      layout: DefaultLayout
    },
    {
      component: ProductDetails,
      path: '/:owner/products/:id',
      layout: DefaultLayout
    },
    {
      component: IdeaDetails,
      path: '/:owner/ideas/:id',
      layout: DefaultLayout
    },
    {
      component: Logout,
      path: '/logout',
      layout: DefaultLayout
    },
  ],
  authRoutes: [
    {
      component: ProductUpdater,
      path: '/newproduct',
      layout: DefaultLayout,
    },
    {
      component: IdeaUpdater,
      path: '/newidea',
      layout: DefaultLayout,
    },
    {
      component: MyCart,
      path: '/mycart',
      layout: DefaultLayout,
    },
    {
      component: ProfProfileUpdater,
      path: '/myprofprofile',
      layout: DefaultLayout,
    },
    {
      component: ProductUpdater,
      path: '/products/:id/updateProduct',
      layout: DefaultLayout,
    },
    {
      component: MyProductList,
      path: '/myproducts',
      layout: DefaultLayout,
    }, {
      component: ProductsPage,
      path: '/productspage/:id',
      layout: DefaultLayout,
    },
    {
      component: ProductsPage,
      path: '/productspages',
      layout: DefaultLayout,
    }, {
      component: IdeasPage,
      path: '/ideaspage',
      layout: DefaultLayout,
    },
    {
      component: BusinessProfile,
      path: '/businessprofile/:id',
      layout: DefaultLayout,
    }, {
      component: BusinessProducts,
      path: '/:id/products',
      layout: DefaultLayout,
    }, {
      component: BusinessIdeas,
      path: '/:id/ideas',
      layout: DefaultLayout,
    },
    {
      component: IdeaUpdater,
      path: '/ideas/:id/updateIdea',
      layout: DefaultLayout,
    }, {
      component: MyIdeaList,
      path: '/myideas',
      layout: DefaultLayout,
    },
    {
      component: MyAccount,
      path: '/myprofile',
      layout: DefaultLayout,
    }, {
      component: NorProfileUpdater,
      path: '/updateprofile',
      layout: DefaultLayout,

    },
    {
      component: FavProducts,
      path: '/favproducts',
      layout: DefaultLayout,
      shortList: false,
    },
    {
      component: FavIdeas,
      path: '/favideas',
      layout: DefaultLayout,
      shortList: false,
    },
  ],
  adminRoute: [
    {
      component: Login,
      path: '/admlogin',
      layout: AdminLayout,
    },
    {
      component: Page404,
      path: '/pages',
      layout: AdminLayout,
    },
    {
      component: Page500,
      path: '/inbox',
      layout: AdminLayout,
    },
  ],
};

