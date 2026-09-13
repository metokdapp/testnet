import { createPublicClient, defineChain, fallback, getAddress, http, isAddress } from 'viem'

const DEFAULT_RPC = 'https://testnet-rpc.monad.xyz'
const configuredRpcUrls = (import.meta.env.VITE_RPC_URLS || import.meta.env.VITE_RPC_URL || DEFAULT_RPC)
  .split(',')
  .map((x:string)=>x.trim())
  .filter(Boolean)

export const RPC_URLS = Array.from(new Set(configuredRpcUrls.length ? configuredRpcUrls : [DEFAULT_RPC]))
export const RPC_URL = RPC_URLS[0]
export const EXPLORER_URL = import.meta.env.VITE_EXPLORER_URL || 'https://testnet.monadscan.com'

export const monad = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: { default: { http: RPC_URLS } },
  blockExplorers: { default: { name: 'MonadScan', url: EXPLORER_URL } }
})

export const DEFAULT_CONTRACT_ADDRESS = '0xd37956c44985c2154738425222376a9d63dcf0cb' as const
const rawAddress = import.meta.env.VITE_METOK_CONTRACT || DEFAULT_CONTRACT_ADDRESS
export const CONTRACT_ADDRESS = isAddress(rawAddress) ? getAddress(rawAddress) : undefined

export const publicClient = createPublicClient({
  chain: monad,
  transport: fallback(RPC_URLS.map((url:string)=>http(url,{timeout:12_000,retryCount:4})), { rank: true })
})

export const ZERO = '0x0000000000000000000000000000000000000000' as const
