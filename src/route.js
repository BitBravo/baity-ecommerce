import React, { Component } from 'react';
import Loadable from 'react-loadable';

import Home from 'components/Home';
import ProductsPage from 'components/ProductsPage';
import IdeasPage from 'components/IdeasPage';
import Register from 'components/Register';
import RegisterNormal from 'components/RegisterNormal';
import ProductDetails from 'components/ProductDetails';
import ProductUpdater from 'components/ProductUpdater';
import MyProductList from 'components/MyProductList';
import IdeaDetails from 'components/IdeaDetails';
import IdeaUpdater from 'components/IdeaUpdater';
import MyIdeaList from 'components/MyIdeaList';
import MyAccount from 'components/MyAccount';
import ProfProfileUpdater from 'components/ProfProfileUpdater';
import NorProfileUpdater from 'components/NorProfileUpdater';
import Registration from 'components/Registration';
import FavProducts from 'components/FavProducts';
import FavIdeas from 'components/FavIdeas';
import BusinessProfile from 'components/BusinessProfile';
import PasswordResetter from 'components/PasswordResetter';
import BusinessIdeas from 'components/BusinessIdeas';
import BusinessProducts from 'components/BusinessProducts';
import Login from 'views/Login';
import Logout from 'views/Logout';
import Page404 from 'views/Page404';
import Page500 from 'views/Page500';
import { MyCart } from 'components/MyCart';

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
      component: Register,
      path: '/registerProf',
      layout: DefaultLayout
    },
    {
      component: RegisterNormal,
      path: '/registerNormal',
      layout: DefaultLayout
    },
    {
      component: PasswordResetter,
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

