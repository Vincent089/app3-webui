export interface Vlan {
  id: string
  core_id: number
  core_name: string
  number: number
  subnet: string
  gcode: string
  purpose: string
  name: string
  description: string | null
}

export interface Vrf {
  id: string
  asn_number: number
  datacenter: string
  description: string | null
  gcode: string
  name: string
  number: number
  purpose: string
  qualifier: string
  rd: string
  scope: string
  subscope: string
}

export interface Core {
  id: number
  datacenter: string
  name: string
  size: number
}

export interface Company {
  id: string
  gcode: string | null
  name: string
  updated_at: string
  created_at: string
  [key: string]: unknown
}

export interface VlanRestriction {
  id: number
  core_id: number
  core_name: string
  description: string
  start: number
  end: number
}
