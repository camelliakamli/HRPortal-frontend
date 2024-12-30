import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false); 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = async () => {
 
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = () => {
    
  };

  return (
    <div className="relative z-10 flex justify-center items-center min-h-screen max-h-screen">
      <div className="p-8 bg-white rounded-xl shadow-lg max-w-md w-full pb-4 pt-8 flex flex-col justify-between">
        {/* Logo Section */}
        <div className="flex justify-center mb-2">
          <img
            src="/fff.png" 
            alt="Logo"
            className="h-14 w-18"
          />
        </div>

        {/* Form Section */}
        <div className="flex-grow">
          <p className="flex justify-center text-[#333333] text-base font-medium pb-8 pt-2">
            Log in to access your space
          </p>
          <form className="flex flex-col w-full">
            {/* Email Input */}
            <label htmlFor="email" className="text-left mb-2 text-slate-800 text-sm">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 mb-1 border bg-slate-50 border-gray-300 rounded-md h-10 text-base focus:outline-none focus:ring focus:border-teal-500"
            />
            <p className="ml-2 mb-2 font-normal text-[#9DA0A7] text-xs">example@email.com</p>

            {/* Password Input */}
            <label htmlFor="password" className="text-left mb-2 text-slate-800 text-sm">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 mb-1 border bg-slate-50 border-gray-300 rounded-md h-10 text-base focus:outline-none focus:ring"
            />
            <p className="ml-2 mb-2 font-normal text-[#9DA0A7] text-xs">Enter at least 8+ characters</p>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center mb-6 mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#109CF1] bg-gray-100 border-gray-300 rounded  focus:ring-[#109CF1]"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-800">
                  Remember me
                </label>
              </div>
              <a href="/forget-password" className="text-[#109cf1] text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-gradient text-white py-2 rounded-md hover:bg-blue-gradient-hover transition mt-4 mb-4"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-[#9095A0] text-center mt-6 text-sm">
          © 2024 HRPortal, All right Reserved
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
