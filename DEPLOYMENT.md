# Deployment identity

- Network: Monad Testnet
- Chain ID: 10143 (`0x279f`)
- Native currency: MON
- METOK: `0xd37956c44985c2154738425222376a9d63dcf0cb`
- Default public RPC: `https://testnet-rpc.monad.xyz`
- Explorer: `https://testnet.monadscan.com`

The address above is pinned as the frontend default and can be overridden at build time with `VITE_METOK_CONTRACT`. Production should keep the pinned address unless intentionally launching a separately audited V4 deployment.

For event-index startup, `VITE_DEPLOYMENT_BLOCK` is optional. If omitted, the frontend derives a deployment block from the immutable `DEPLOYED_AT` timestamp once and caches it locally.


## MetaMask Connect deployment note

Version 5.1 requires outbound WebSocket access to `wss://mm-sdk-relay.api.cx.metamask.io` for remote MetaMask Mobile sessions (for example Chrome mobile). Run `npm run security:headers` before deployment so Cloudflare `_headers` and `vercel.json` include the relay and the required connection-UI style policy.
