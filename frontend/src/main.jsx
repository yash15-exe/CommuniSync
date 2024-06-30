import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter,
  Route,
  Router,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "./components/LoginComponent.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "../store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Dashboard from "./pages/Dashboard.jsx";
import CreateCommunity from "./components/CreateCommunity.jsx";
import TrendingComponent from "./components/TrendingComponent.jsx";
import CommunityDetails from "./components/CommunityDetails.jsx";
import CommunityInfo from "./components/CommunityInfo.jsx";
import AddPost from "./components/AddPost.jsx";
import SearchedCommunities from "./components/SearchedCommunities.jsx";
import Profile from "./components/profile.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard" element={<TrendingComponent />} />
        <Route path="/dashboard/profile" element={<Profile/>} />
        
        <Route
          path="/dashboard/community/:communityId"
          element={<CommunityDetails />}
        />
        <Route
          path="/dashboard/communityInfo/:communityId"
          element={<CommunityInfo />}
        />
        <Route
          path="/dashboard/createCommunity"
          element={<CreateCommunity />}
        />
        <Route
          path="/dashboard/posts/addPost/:communityObjectId"
          element={<AddPost />}
        />
        <Route
          path="/dashboard/search/:searchInfo"
          element={<SearchedCommunities />}
        />
      </Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
