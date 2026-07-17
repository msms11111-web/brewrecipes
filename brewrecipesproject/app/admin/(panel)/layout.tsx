import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import AdminShell from '@/app/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) {
    redirect('/admin/login')
  }
  return <AdminShell>{children}</AdminShell>
}
