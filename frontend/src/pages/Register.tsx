import React, { useState } from 'react';
import { FaBuilding, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitted, setSubmitted] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

	const validate = () => {
		const err: Record<string, string> = {};
		if (!form.name.trim()) err.name = 'Name is required';
		if (!form.email) err.email = 'Email is required';
		else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email';
		if (!form.phone) err.phone = 'Phone is required';
		else if (!/^\+?\d{7,15}$/.test(form.phone)) err.phone = 'Enter a valid phone (7–15 digits)';
		if (!form.password) err.password = 'Password is required';
		else if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
		setErrors(err);
		return Object.keys(err).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validate()) {
			setSubmitted(true);
			// Replace this with actual submit logic (API call)
			console.log('Register payload:', form);
		} else {
			setSubmitted(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center p-6 bg-bg"
			style={{ backgroundColor: '#f8faf9' }} // fallback before tailwind rebuild
		>
			{/* Use items-stretch so both panels match height */}
			<div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
				{/* Left visual panel (full height) */}
				<div className="hidden md:flex flex-col rounded-xl overflow-hidden shadow-panel">
					{/* Image fills its container to match height of the form */}
					<img
						alt="residential-community"
						src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80"
						className="w-[100%] h-[80%] object-cover aspect-[5/3]"
					/>
					{/* Info block sits at bottom */}
					<div className="p-6 bg-white">
						<h3 className="text-2xl font-semibold text-slate-900">Better society maintenance</h3>
						<p className="mt-2 text-slate-600">Streamline resident requests, schedule maintenance and keep shared spaces in great shape.</p>
						<ul className="mt-4 space-y-1 text-sm text-slate-600">
							<li>• Quick complaint logging</li>
							<li>• Priority scheduling</li>
							<li>• Transparent status updates</li>
						</ul>
					</div>
				</div>

				{/* Right form panel — full height and vertically centered */}
				<form
					onSubmit={handleSubmit}
					className="bg-card rounded-xl shadow-soft-lg p-8 md:p-10 h-full flex flex-col justify-center"
					noValidate
				>
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-sm bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
								<FaBuilding className="text-white w-5 h-5" />
							</div>
							<div>
								<h1 className="text-xl font-semibold text-slate-900">MaintenancePro</h1>
								<p className="text-sm text-slate-500">Society maintenance made simple</p>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						{/* Name */}
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
							<input
								name="name"
								value={form.name}
								onChange={handleChange}
								placeholder="John Doe"
								className={`w-full rounded-sm border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition ${
									errors.name ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/30'
								}`}
								aria-invalid={!!errors.name}
								aria-describedby={errors.name ? 'name-error' : undefined}
							/>
							{errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
							<input
								name="email"
								type="email"
								value={form.email}
								onChange={handleChange}
								placeholder="you@community.com"
								className={`w-full rounded-sm border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition ${
									errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/30'
								}`}
								aria-invalid={!!errors.email}
								aria-describedby={errors.email ? 'email-error' : undefined}
							/>
							{errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
						</div>

						{/* Phone */}
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
							<input
								name="phone"
								type="tel"
								value={form.phone}
								onChange={handleChange}
								placeholder="+1 234 567 890"
								className={`w-full rounded-sm border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition ${
									errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/30'
								}`}
								aria-invalid={!!errors.phone}
								aria-describedby={errors.phone ? 'phone-error' : undefined}
							/>
							{errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
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
									placeholder="At least 6 characters"
									className={`w-full rounded-sm border px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 transition ${
										errors.password ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/30'
									}`}
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
							{errors.password && <p id="password-error" className="mt-1 text-xs text-red-600">{errors.password}</p>}
						</div>

						{/* CTA + links */}
						<div>
							<button
								type="submit"
								className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 bg-primary text-white font-medium hover:brightness-95 transition"
							>
								Create account
							</button>

							{submitted && <p className="text-sm text-green-600 text-center mt-3">Looks good — ready to submit.</p>}

							<div className="flex items-center justify-between text-sm text-slate-600 mt-4">
								<p>Already have an account? <a href="/login" className="text-primary font-medium hover:underline">Login</a></p>
								<a href="/forgot-password" className="hover:underline">Forgot password?</a>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
