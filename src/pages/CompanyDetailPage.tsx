import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCompany } from '@/hooks/useCompanies'
import { Button } from '@/components/ui/button'

const STANDARD_KEYS = new Set(['id', 'gcode', 'name', 'created_at', 'updated_at'])

export function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: company, isLoading } = useCompany(id!)

  const metaEntries = company
    ? Object.entries(company).filter(([k]) => !STANDARD_KEYS.has(k))
    : []

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex h-14 items-center gap-3 border-b bg-card px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/companies')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-base font-semibold">
          {isLoading ? 'Loading…' : (company?.name ?? 'Company')}
        </h1>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-[900px] space-y-6">

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 animate-pulse rounded bg-muted" />
              ))}
            </div>
          ) : !company ? (
            <p className="text-muted-foreground">Company not found.</p>
          ) : (
            <>
              <section className="rounded-lg border bg-card">
                <div className="border-b px-4 py-3">
                  <h2 className="text-sm font-medium">Details</h2>
                </div>
                <dl className="divide-y text-sm">
                  {[
                    { label: 'ID', value: company.id },
                    { label: 'GCode', value: company.gcode ?? '—' },
                    { label: 'Name', value: company.name },
                    { label: 'Created', value: new Date(company.created_at).toLocaleString() },
                    { label: 'Updated', value: new Date(company.updated_at).toLocaleString() },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex px-4 py-2.5">
                      <dt className="w-32 shrink-0 text-muted-foreground">{label}</dt>
                      <dd className="break-all">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="rounded-lg border bg-card">
                <div className="border-b px-4 py-3">
                  <h2 className="text-sm font-medium">
                    Meta Fields
                    <span className="ml-2 text-xs text-muted-foreground">({metaEntries.length})</span>
                  </h2>
                </div>
                {metaEntries.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-muted-foreground">No meta fields.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="border-b px-4 py-2 text-left font-medium text-muted-foreground">Key</th>
                          <th className="border-b px-4 py-2 text-left font-medium text-muted-foreground">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metaEntries.map(([key, value], i) => (
                          <tr key={key} className={i % 2 === 0 ? '' : 'bg-muted/10'}>
                            <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{key}</td>
                            <td className="px-4 py-2 break-all">{String(value ?? '')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
