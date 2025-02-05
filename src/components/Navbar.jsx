

//   return (
//     <nav className="flex justify-between p-4 bg-gray-800 text-white">
//       <h1 className="text-xl font-bold">E-commerce</h1>
//       <div className="space-x-4">

//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/" className="hover:underline">About</Link>
//         <Link to="/" className="hover:underline">Contact</Link>
//         </div>
//      <div className="space-x-4">


//         {isAuthenticated ? (
//           <>
//             <span>Welcome, {user.username}</span>
//             <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:underline">Login</Link>
//             <Link to="/signup" className="hover:underline">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="container mx-auto">

        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">E-commerce</h1>


          <div className=" flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/" className="hover:underline">About</Link>
            <Link to="/" className="hover:underline">Contact</Link>
          </div>
             {isAuthenticated ? (
              <>
                <span>Welcome, {user.username}</span>
                <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Logout</button>
              </>
            ) : (
              <>
                <div className="flex space-x-4 items-end">
                  <Link to="/login" className="hover:underline">Login</Link>
                  <Link to="/signup" className="hover:underline">Sign Up</Link>
                </div>
              </>
            )
            }
        </div>
      </div>
      <div className="border-b border-gray-300 w-full"></div>
    </>
  );
};

export default Navbar;