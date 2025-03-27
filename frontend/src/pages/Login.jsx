import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`min-h-screen flex flex-col  items-center justify-center px-4 sm:px-6 lg:px-8 
      ${darkMode ? 'bg-blue-900' : 'bg-blue-600'}`}>
      
      {/* Logo Icon */}
      <div className="mb-8">
        <ShoppingCartIcon className="h-16 w-16 text-white transform -rotate-12" />
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md space-y-4 ">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md 
                text-white placeholder-white/70 focus:outline-none focus:ring-2 
                focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              placeholder="USERNAME"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md 
                text-white placeholder-white/70 focus:outline-none focus:ring-2 
                focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-white text-blue-600 rounded-md font-medium
              hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 
              transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Implement forgot password functionality
                toast.info('Forgot password functionality coming soon');
              }}
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>

      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-700/30 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] -z-10" />
    </div>
  );
};

export default Login; 