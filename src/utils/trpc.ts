import { createTRPCReact, type inferReactQueryProcedureOptions } from '@trpc/react-query'

import { AppRouter } from '../server/routers/_app'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
export const trpc = createTRPCReact<AppRouter>()
