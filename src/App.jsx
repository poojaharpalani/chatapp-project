// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import Auth from "./pages/auth";
// import Chat from "./pages/chat";
// import Profile from "./pages/profile";
// import { useAppstore } from "./store";
// import { GET_USER_INFO } from "./utils/constants";
// import { apiClient } from "./lib/api-client";

// const PrivateRoute = ({ children }) => {
//   const { userInfo } = useAppstore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? children : <Navigate to="/auth" />;
// };

// const AuthRoute = ({ children }) => {
//   const { userInfo } = useAppstore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? <Navigate to="/chat" /> : children;
// };

// const App = () => {
//   const { userInfo, setUserInfo } = useAppstore();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const response = await apiClient.get(GET_USER_INFO, {
//           withCredentials: true,
//         });
//         console.log(response);
//         if (response.status === 200 && response.data.id) {
//           setUserInfo(response.data);
//         } else {
//           setUserInfo(undefined);
//         }
//         console.log(response);
//       } catch (error) {
//         setUserInfo(undefined);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (!userInfo) {
//       getUserData();
//     } else {
//       setLoading(false);
//     }
//   }, [userInfo, setUserInfo]);

//   if (loading) {
//     return <div>Loading....</div>;
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/auth"
//           element={
//             <AuthRoute>
//               <Auth />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/chat"
//           element={
//             <PrivateRoute>
//               <Chat />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/auth" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppstore } from "./store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";

// Private route logic for authenticated users
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppstore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

// Auth route logic for non-authenticated users
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppstore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppstore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center  h-screen">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-purple-400 text-4xl animate-spin flex items-center justify-center border-t-purple-600 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-slate-400 text-2xl animate-spin flex items-center justify-center border-t-slate-400 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
