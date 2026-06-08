import React from 'react';
import { Image, Trash2 } from 'lucide-react';

export const FormInput = ({ label, value, onChange, placeholder, type = "text", className = "" }) => (
    <div className={`w-full ${className}`}>
        {label && <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>}
        <input 
            type={type} 
            placeholder={placeholder || label} 
            value={value} 
            onChange={onChange} 
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" 
        />
    </div>
);
export const FormSelect = ({ label, value, onChange, options, className = "" }) => (
    <div className={`w-full ${className}`}>
        {label && <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>}
        <select 
            value={value} 
            onChange={onChange} 
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm appearance-none" 
        >
            <option value="" disabled>Select {label}</option>
            {options.map((opt, idx) => (
                <option key={idx} value={opt.value || opt}>{opt.label || opt}</option>
            ))}
        </select>
    </div>
);
export const FormTextarea = ({ label, value, onChange, placeholder, rows = 3, className = "" }) => (
    <div className={`w-full ${className}`}>
        {label && <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>}
        <textarea 
            rows={rows} 
            placeholder={placeholder || label} 
            value={value} 
            onChange={onChange} 
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
        ></textarea>
    </div>
);

export const ImageInput = ({ label, value, onChange, onChoose, className = "" }) => (
    <div className={`w-full ${className}`}>
        {label && <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>}
        <div className="flex gap-2">
            <input 
                type="text" 
                placeholder="Image URL" 
                value={value} 
                onChange={onChange} 
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" 
            />
            <button 
                onClick={onChoose} 
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-2 whitespace-nowrap"
            >
                <Image size={16}/> Choose
            </button>
        </div>
        {value && (
            <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 h-[100px] w-fit max-w-full">
                <img 
                    src={value.startsWith('http') ? value : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace('/api', '')}${value}`} 
                    alt="Preview" 
                    className="h-full w-auto object-contain"
                />
            </div>
        )}
    </div>
);

export const FormCard = ({ title, onRemove, children, className = "" }) => (
    <div className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group transition-all hover:border-blue-200 ${className}`}>
        {title && <h4 className="font-semibold text-slate-700 mb-4 flex items-center justify-between">{title}</h4>}
        {onRemove && (
            <button 
                onClick={onRemove} 
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                title="Remove item"
            >
                <Trash2 size={18}/>
            </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);
