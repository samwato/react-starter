import * as React from 'react'
import { Route, RouterProvider } from '@/lib/router'
import { Layout } from '@/components/layout'
import { Dashboard } from '@/routes/dashboard'
import { Reports } from '@/routes/reports'
import { Accounts } from '@/routes/accounts'
import { Users } from '@/routes/accounts/users'
import { User } from '@/routes/accounts/users/user'
import { Post } from '@/routes/accounts/users/post'
import { NotFound } from '@/routes/not-found'

export function App() {
  return (
    <RouterProvider fallback={<NotFound />}>
      <Route path="/" component={<Layout />}>
        <Route component={<Dashboard />} />
        <Route path="/reports" component={<Reports />} />
        <Route path="/accounts" component={<Accounts />}>
          <Route path="/users" component={<Users />}>
            <Route path="/:userId" component={<User />}>
              <Route path="/:postId" component={<Post />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </RouterProvider>
  )
}
