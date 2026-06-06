import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthGate } from '@/components/AuthGate'
import { Layout } from '@/components/layout/Layout'
import { VlansPage } from '@/pages/VlansPage'
import { VrfsPage } from '@/pages/VrfsPage'
import { CoresPage } from '@/pages/CoresPage'
import { AsnsPage } from '@/pages/AsnsPage'
import { VlanRestrictionsPage } from '@/pages/VlanRestrictionsPage'

export function App() {
  return (
    <AuthGate>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/vlans" replace />} />
          <Route path="/vlans" element={<VlansPage />} />
          <Route path="/vrfs" element={<VrfsPage />} />
          <Route path="/vlanrestrictions" element={<VlanRestrictionsPage />} />
          <Route path="/cores" element={<CoresPage />} />
          <Route path="/asns" element={<AsnsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthGate>
  )
}
