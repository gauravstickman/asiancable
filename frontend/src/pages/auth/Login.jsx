import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, message, admin } = useSelector((state) => state.auth);

    React.useEffect(() => {
        if (admin) {
            navigate('/admin');
        }
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }
    }, [admin, isError, message, navigate, dispatch]);

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    return (
        <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md glass-card p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <img src="/LOGO_Dark.svg" alt="Asian Cables Logo" className="h-16 w-auto" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Enter your credentials to access the portal</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                {...register('email', { required: 'Email is required' })}
                                type="email" 
                                placeholder="admin@example.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                            />
                        </div>
                        {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                {...register('password', { required: 'Password is required' })}
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                            />
                        </div>
                        {errors.password && <span className="text-red-400 text-xs mt-1">{errors.password.message}</span>}

                    </div>

                    <button 
                        disabled={isLoading}
                        type="submit" 
                        className="w-full premium-gradient py-3 rounded-xl font-bold text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>&copy; 2026 Asian Cables. All rights reserved.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
