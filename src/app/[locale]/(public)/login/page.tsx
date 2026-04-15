'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push(`/${locale}/admin`);
      } else {
        router.push(`/${locale}/partner`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const labels = {
    ro: {
      title: 'Autentificare',
      email: 'Email',
      password: 'Parolă',
      submit: 'Conectare',
      loading: 'Se conectează...',
    },
    en: {
      title: 'Login',
      email: 'Email',
      password: 'Password',
      submit: 'Sign In',
      loading: 'Signing in...',
    },
    it: {
      title: 'Accesso',
      email: 'Email',
      password: 'Password',
      submit: 'Accedi',
      loading: 'Accesso in corso...',
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="min-h-screen flex items-center justify-center bg-tech-bg p-4 tech-grid-bg">
      <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <div className="tech-card-elevated tech-border-gradient !p-8">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <div className="tech-badge mb-4 mx-auto w-fit">
            <span className="font-mono">{'//'} SIGN IN</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-center mb-8 text-tech-text">
            {t.title}
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-tech-danger/10 border border-tech-danger/30 rounded-lg flex items-center gap-3 text-tech-danger">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-tech-text-muted mb-2">
                {'//'} {t.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tech-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-tech-surface border border-tech-border rounded-lg text-tech-text placeholder-tech-text-muted focus:outline-none focus:border-tech-accent focus:ring-1 focus:ring-tech-accent font-mono"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-tech-text-muted mb-2">
                {'//'} {t.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tech-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-tech-surface border border-tech-border rounded-lg text-tech-text placeholder-tech-text-muted focus:outline-none focus:border-tech-accent focus:ring-1 focus:ring-tech-accent font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.loading : t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
