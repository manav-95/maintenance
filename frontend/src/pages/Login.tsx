import React, { useState } from 'react';
import { FaBuilding, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { nav } from 'framer-motion/client';

const Login = () => {

	const { login } = useAuth();
	const navigate = useNavigate();

	const [form, setForm] = useState({ phone: '', password: '' });
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitted, setSubmitted] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

	const validate = () => {
		const err: Record<string, string> = {};
		if (!form.phone) err.phone = 'Phone is required';
		else if (form.phone.length < 10) err.phone = 'Please enter a valid phone number';
		if (!form.password) err.password = 'Password is required';
		else if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
		setErrors(err);
		return Object.keys(err).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		try {
			if (validate()) {
				const res = await axios.post(`${baseUrl}/auth/login`, form, {
					withCredentials: true
				});

				// console.log('Login response:', res);
				if (res.status === 200 && res.data.accessToken) {
					login(res.data.user, res.data.accessToken);
					alert('Login successful!');
					navigate('/dashboard');
				} else {
					setErrors({ general: res.data.message || 'Login failed' });
					alert(res.data.message || 'Login failed');
					setSubmitted(false);
				}
			} else {
				setSubmitted(false);
			}
		} catch (error) {
			console.error('Login error:', error);
			setSubmitted(false);
		}
	};


	return (
		<div
			className="min-h-screen flex items-center justify-center p-6 bg-bg"
			style={{ backgroundColor: '#f8faf9' }}
		>
			<div className="w-full max-w-md">
				<form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-soft-lg p-8 md:p-10 space-y-6" noValidate>
					{/* Header */}
					<div className="flex items-center gap-4 mb-1">
						<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
							<FaBuilding className="w-6 h-6 text-white" aria-hidden="true" />
						</div>
						<div>
							<h1 className="text-lg font-semibold text-slate-900">MaintenancePro</h1>
							<p className="text-sm text-slate-500">Society maintenance — sign in</p>
						</div>
					</div>

					<h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
					<p className="text-sm text-slate-500">Sign in to manage complaints, work orders and shared amenities.</p>

					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
						<input
							name="phone"
							type="tel"
							value={form.phone}
							maxLength={10}
							onChange={handleChange}
							placeholder="Enter Phone Number"
							className={`w-full px-4 py-3 rounded-sm border text-sm focus:outline-none focus:ring-2 transition ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/30'}`}
							aria-invalid={!!errors.phone}
							aria-describedby={errors.phone ? 'phone-error' : undefined}
						/>
						{errors.phone && <p id="phone-error" className="mt-2 text-xs text-red-600">{errors.phone}</p>}
					</div>

					{/* Password */}
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
						<div className="relative">
							<input
								name="password"
								type={showPassword ? 'text' : 'password'}
								value={form.password}
								onChange={handleChange}
								placeholder="Your password"
								className={`w-full px-4 py-3 pr-12 rounded-sm border text-sm focus:outline-none focus:ring-2 transition ${errors.password ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/30'}`}
								aria-invalid={!!errors.password}
								aria-describedby={errors.password ? 'password-error' : undefined}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(s => !s)}
								className="absolute inset-y-0 right-3 inline-flex items-center text-slate-500"
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
							</button>
						</div>
						{errors.password && <p id="password-error" className="mt-2 text-xs text-red-600">{errors.password}</p>}
					</div>

					{/* Actions */}
					<div className="flex items-center justify-between text-sm">
						<a href="/forgot-password" className="text-primary hover:underline">Forgot password?</a>
					</div>

					<button
						type="submit"
						className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
						disabled={submitted}
					>
						{submitted ? (
							<>
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								<span>Signing In...</span>
							</>
						) : (
							<>
								<FaSignInAlt className="w-5 h-5" />
								Sign In
							</>
						)}
					</button>



					<p className="mt-2 text-center text-sm text-slate-600">
						Don't have an account? <a href="/register" className="text-primary font-medium hover:underline">Register</a>
					</p>

					<div className="text-center text-sm text-slate-500">
						By signing in you agree to our <span className="text-primary">Terms</span> and <span className="text-primary">Privacy</span>.
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
