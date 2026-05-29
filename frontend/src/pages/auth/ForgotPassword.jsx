import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../../api/axios';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [fallbackMessage, setFallbackMessage] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setFallbackMessage(null);
        try {
            const response = await API.post('/auth/forgot-password', { email: data.email });
            toast.success(response.data.message || 'Email sent successfully');
            setIsSuccess(true);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to send email';
            if (errorMsg.includes('http')) {
                // We got a fallback link from backend because SMTP isn't configured
                setFallbackMessage(errorMsg);
                setIsSuccess(true); // Show success UI anyway so they can see the link
            } else {
                toast.error(errorMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

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
                        <img src="/LOGO_Dark.svg" alt="Asian Cables Logo" className="h-16 w-auto" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
                    <p className="text-slate-400">Enter your email to receive a password reset link</p>
                </div>

                {!isSuccess ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    {...register('email', { 
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    type="email" 
                                    placeholder="admin@example.com"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                />
                            </div>
                            {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
                        </div>

                        <button 
                            disabled={isLoading}
                            type="submit" 
                            className="w-full premium-gradient py-3 rounded-xl font-bold text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Send Reset Link'}
                        </button>
                    </form>
                ) : (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                        {fallbackMessage ? (
                            <div className="text-amber-400 font-medium text-sm text-left break-all">
                                {fallbackMessage.split('http')[0]}
                                <br/><br/>
                                <a href={'http' + fallbackMessage.split('http')[1]} className="text-primary-400 underline font-bold">
                                    {'http' + fallbackMessage.split('http')[1]}
                                </a>
                            </div>
                        ) : (
                            <>
                                <p className="text-emerald-400 font-medium">Check your email for the reset link.</p>
                                <p className="text-sm text-slate-400 mt-2">If you don't see it, check your spam folder.</p>
                            </>
                        )}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
                    <Link to="/admin/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium inline-flex items-center gap-2">
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
