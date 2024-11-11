// import React, { Children, useState, useEffect } from "react";
// import { Button } from "./components/ui/button";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Auth from "./pages/auth";
// import Chat from "./pages/chat";
// import Profile from "./pages/profile";
// import { useAppstore } from "./store";
// import { apiClient } from "./lib/api-client";
// import { GET_USER_INFO } from "./utils/constants";
// const PrivateRoute = ({ children }) => {
//   const { userInfo } = useAppstore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? children : <Navigate to="/auth"></Navigate>;
// };
// const AuthRoute = ({ children }) => {
//   const { userInfo } = useAppstore();

//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? <Navigate to="/chat"></Navigate> : children;
// };
// const App = () => {
//   const { userInfo, setUserInfo } = useAppstore();
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const getUserData = async () => {
//       console.log(GET_USER_INFO);
//       try {
//         const response = await apiClient.get(GET_USER_INFO, {
//           withCredentials: true,
//         });
//         if (response.status === 200 && response.data.id) {
//           setUserInfo(response.data);
//         } else {
//           setUserInfo(undefined);
//         }

//         console.log({ response });
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
//         <Route path="/auth" element={<AuthRoute></AuthRoute>}></Route>
//         <Route
//           path="/chat"
//           element={
//             <PrivateRoute>
//               <Chat></Chat>
//             </PrivateRoute>
//           }
//         ></Route>
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile></Profile>
//             </PrivateRoute>
//           }
//         ></Route>
//         <Route path="*" element={<Navigate to="/auth"></Navigate>}></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export default App;
