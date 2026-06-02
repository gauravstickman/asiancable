import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../../api/axios';
import logoDark from '../../assets/LOGO_Dark.svg';

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await API.put(`/auth/reset-password/${token}`, { password: data.password });
            toast.success(response.data.message || 'Password reset successfully');
            navigate('/admin/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    const password = watch('password');

    return (
        <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 blur-[120px] rounded-full mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md glass-card p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <img src={logoDark} alt="Asian Cables Logo" className="h-16 w-auto" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                    <p className="text-slate-400">Enter your new password below</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                {...register('password', { 
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                            />
                        </div>
                        {errors.password && <span className="text-red-400 text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                {...register('confirmPassword', { 
                                    required: 'Please confirm your password',
                                    validate: value => value === password || 'Passwords do not match'
                                })}
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                            />
                        </div>
                        {errors.confirmPassword && <span className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</span>}
                    </div>

                    <button 
                        disabled={isLoading}
                        type="submit" 
                        className="w-full premium-gradient py-3 rounded-xl font-bold text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Reset Password'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
