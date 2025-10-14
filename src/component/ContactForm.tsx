import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string; // query message
}

type StatusType = '' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<StatusType>('');
  const [focusedField, setFocusedField] = useState<string>('');

  const handleSubmit = async () => {
    setStatus('sending');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-3xl shadow-2xl p-8 space-y-6">
        {/* Decorative elements */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-indigo-300 to-blue-400 rounded-full blur-3xl opacity-50"></div>

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Get In Touch
          </h2>
          <p className="text-slate-600 text-sm">We&apos;d love to hear from you. Send us a message!</p>
        </div>

        {/* Form fields */}
        <div className="space-y-5 relative z-10">
          {/* Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Your Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              className="relative w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              className="relative w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 12345 67890"
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField('')}
              className="relative w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          {/* Query Message */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Your Query</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what's on your mind..."
              rows={5}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField('')}
              className="relative w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={status === 'sending' || !isFormValid}
          className="relative w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-indigo-300 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {/* Status message */}
        {status && status !== 'sending' && (
          <div className={`text-center p-4 rounded-xl backdrop-blur-sm ${
            status === 'success' ? 'bg-emerald-100 border border-emerald-300 text-emerald-700' : 'bg-rose-100 border border-rose-300 text-rose-700'
          }`}>
            {status === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-slate-500 text-xs relative z-10">
            <p>We&apos;ll get back to you soon.</p>
        </div>

      </div>
    </div>
  );
}
