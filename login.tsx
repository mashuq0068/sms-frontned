// src/pages/Login.jsx - PRODUCTION STABLE VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFrappeAuth } from 'frappe-react-sdk';
import { 
  Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Zap, TrendingUp, 
  CheckCircle, Users, FileText, Building, Globe, Server, AlertCircle,
  UserPlus, HelpCircle
} from 'lucide-react';

// Config from environment variables
const APP_CONFIG = {
  FRAPPE_URL: import.meta.env.VITE_FRAPPE_URL || 'http://localhost:8000',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'AlfaSX',
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || 'supplier-support@alfasx.com'
};

const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-300 text-sm">{message}</p>
    </div>
  </div>
);

const AlfaSXLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser, isLoading } = useFrappeAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  // ✅ FIXED: Auto-redirect if already authenticated
  useEffect(() => {
    if (currentUser && !isLoading) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [currentUser, isLoading, navigate, location]);

  // ✅ FIXED: Load saved email
  useEffect(() => {
    const savedEmail = localStorage.getItem('alfaSX_remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // ✅ FIXED: Clean login function - NO manual updateCurrentUser()
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    
    try {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      if (rememberMe) {
        localStorage.setItem('alfaSX_remembered_email', email);
      } else {
        localStorage.removeItem('alfaSX_remembered_email');
      }
      
      // ✅ SINGLE SDK CALL - SDK handles session automatically
      await login({
        username: email,
        password: password,
      });
      
      // Navigation happens automatically via useEffect above
      
    } catch (err) {
      console.error('Login error:', err);
      
      if (err?.httpStatus === 401) {
        setError('Invalid email or password. Please check your credentials.');
      } else if (err?.message?.includes('Network Error')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err?.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // ✅ FIXED: Secure forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      if (!forgotPasswordEmail) {
        setError('Please enter your email address.');
        return;
      }

      const response = await fetch(/api/method/frappe.core.doctype.user.user.reset_password, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: forgotPasswordEmail
        })
      });

      const data = await response.json();

      if (response.ok) {
        setForgotPasswordSent(true);
        setError('');
      } else {
        // Generic message for security - don't reveal if email exists
        setError('If this email exists in our system, reset instructions will be sent.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleContactSupport = () => {
    window.open(mailto:${APP_CONFIG.SUPPORT_EMAIL}?subject=Support Request - ${APP_CONFIG.APP_NAME}&body=Hello, I need assistance with..., '_blank');
  };

  // ✅ FIXED: Show loading while SDK initializes
  if (isLoading) {
    return <LoadingSpinner message="Initializing session..." />;
  }

  // ✅ FIXED: Don't render login form if authenticated
  if (currentUser) {
    return <LoadingSpinner message="Redirecting to dashboard..." />;
  }

  // Features array
  const features = [
    {
      icon: Shield,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      title: 'Enterprise Security',
      description: 'SOC2 Type II certified with bank-grade encryption'
    },
    {
      icon: Zap,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      title: 'Real-time Updates',
      description: 'Instant notifications and live status tracking'
    },
    {
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      title: 'Advanced Analytics',
      description: 'AI-powered insights and performance metrics'
    },
    {
      icon: CheckCircle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      title: '99.9% Uptime',
      description: 'Enterprise SLA with 24/7 monitoring'
    },
    {
      icon: FileText,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      title: 'Automated Workflows',
      description: 'Streamlined procure-to-pay processes'
    },
    {
      icon: Building,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      title: 'Performance Dashboards',
      description: 'Real-time supplier scorecards and KPIs'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Branding Section */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        }}></div>
        
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 flex flex-col h-full w-full">
          {/* Header */}
          <div className="flex-none px-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <div className="text-slate-900 font-bold text-lg">α</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{APP_CONFIG.APP_NAME}</div>
                  <div className="text-slate-400 text-xs font-medium mt-0.5">Supplier Experience Portal</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Server className="h-3 w-3" />
                  <span className="text-xs font-medium">Production</span>
                </div>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center px-8 py-6">
            <div className="max-w-4xl">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-light leading-tight text-white mb-4">
                  Transform Your
                  <span className="block font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent mt-1">
                    Supply Chain
                  </span>
                  <span className="block text-xl lg:text-2xl font-light text-slate-300 mt-2">
                    Experience
                  </span>
                </h1>
                
                <p className="text-base text-slate-300 leading-relaxed mb-4 font-light max-w-3xl">
                  Streamline procurement, accelerate invoicing, and optimize your entire supply chain workflow with our enterprise-grade supplier portal.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6 max-w-2xl">
                  <div className="text-center p-3 bg-slate-900/30 rounded-xl border border-slate-800/50">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Users className="h-3 w-3 text-blue-400" />
                      <span className="text-lg font-bold text-white">1,247+</span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium">Active Suppliers</div>
                  </div>
                  <div className="text-center p-3 bg-slate-900/30 rounded-xl border border-slate-800/50">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <FileText className="h-3 w-3 text-green-400" />
                      <span className="text-lg font-bold text-white">28,456</span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium">Monthly Transactions</div>
                  </div>
                  <div className="text-center p-3 bg-slate-900/30 rounded-xl border border-slate-800/50">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Building className="h-3 w-3 text-purple-400" />
                      <span className="text-lg font-bold text-white">89</span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium">Enterprise Clients</div>
                  </div>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-slate-900/20 transition-all duration-300">
                    <div className={w-8 h-8 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5}>
                      <feature.icon className={h-4 w-4 ${feature.color}} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1 text-sm leading-tight">{feature.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Integration Badges */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800/50">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                    <div className="text-slate-900 font-bold text-xs">EN</div>
                  </div>
                  <span className="text-slate-400 text-xs font-medium">ERPNext Integrated</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-3 w-3 text-slate-400" />
                  <span className="text-slate-400 text-xs font-medium">Global Deployment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-none px-8 pb-4">
            <div className="flex items-center justify-between text-slate-600 text-xs">
              <div className="flex items-center space-x-2">
                <span>v1.0.0 • Production</span>
                <span>© 2025 {APP_CONFIG.APP_NAME} Enterprise</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Compliance: SOC2 • ISO27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Section */}
      <div className="w-full lg:w-2/5 flex items-center justify-center min-h-screen py-4 lg:py-0">
        <div className="w-full max-w-xs sm:max-w-sm px-4 sm:px-6 py-6">
          
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <div className="text-slate-900 font-bold text-lg">α</div>
              </div>
              <div className="text-white">
                <div className="text-xl font-bold">{APP_CONFIG.APP_NAME}</div>
                <div className="text-slate-400 text-xs mt-0.5">Supplier Portal</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-700/50 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'login' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'register' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Supplier Portal</h2>
                <p className="text-slate-300 text-sm font-light">Sign in to manage your account</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900/40 border-2 border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-white focus:bg-slate-900/60 transition-all duration-300 pr-10 text-sm"
                      placeholder="supplier@company.com"
                      required
                      disabled={isLoggingIn}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Mail className="h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-900/40 border-2 border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-white focus:bg-slate-900/60 transition-all duration-300 pr-10 text-sm"
                      placeholder="Enter your password"
                      required
                      disabled={isLoggingIn}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-white transition-colors disabled:opacity-50"
                      disabled={isLoggingIn}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                        disabled={isLoggingIn}
                      />
                      <div className={`w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                        rememberMe 
                          ? 'bg-white border-white' 
                          : 'border-slate-600 hover:border-slate-500'
                      } ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {rememberMe && (
                          <svg className="w-3 h-3 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={text-sm font-medium text-slate-300 ${isLoggingIn ? 'opacity-50' : ''}}>
                      Remember me
                    </span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('forgot')}
                    className="text-sm font-semibold text-white hover:text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoggingIn}
                  >
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <div className="p-3 bg-red-900/20 border-2 border-red-800/30 rounded-xl flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400 flex-1">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-600 disabled:cursor-not-allowed text-slate-900 font-bold py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl disabled:hover:shadow-lg text-sm"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in to portal</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Forgot Password Form */}
          {activeTab === 'forgot' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Reset Password</h2>
                <p className="text-slate-300 text-sm font-light">Enter your email to receive reset instructions</p>
              </div>

              {forgotPasswordSent ? (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-green-900/20 border-2 border-green-800/30 rounded-xl">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 text-sm font-medium">
                      If this email exists in our system, reset instructions have been sent!
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('login')}
                    className="w-full text-white hover:text-slate-300 text-sm font-medium transition-colors duration-200"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className="w-full bg-slate-900/40 border-2 border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-white focus:bg-slate-900/60 transition-all duration-300 pr-10 text-sm"
                        placeholder="Enter your email"
                        required
                        disabled={isLoggingIn}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Mail className="h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-900/20 border-2 border-red-800/30 rounded-xl flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-red-400 flex-1">{error}</p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="flex-1 bg-white hover:bg-gray-100 disabled:bg-gray-600 text-slate-900 font-bold py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                    >
                      {isLoggingIn ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="flex-1 border-2 border-slate-600 hover:border-white text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Registration Form */}
          {activeTab === 'register' && (
            <div className="text-center space-y-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Join {APP_CONFIG.APP_NAME}</h2>
                <p className="text-slate-300 text-sm font-light">Supplier registration portal</p>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <p className="text-slate-300 text-sm mb-4">
                  To register as a supplier, please contact our procurement team or use the public registration form.
                </p>
                
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => window.open(${APP_CONFIG.FRAPPE_URL}/contact, '_blank')}
                    className="w-full border-2 border-slate-600 hover:border-white hover:bg-white/5 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group text-sm"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Contact Procurement Team</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleContactSupport}
                    className="w-full border-2 border-slate-600 hover:border-white hover:bg-white/5 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email Support</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('login')}
                className="w-full text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 font-medium">
              © 2025 {APP_CONFIG.APP_NAME} Enterprise Solutions
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Secured by 256-bit SSL encryption • v1.0.0
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Support: {APP_CONFIG.SUPPORT_EMAIL}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlfaSXLogin