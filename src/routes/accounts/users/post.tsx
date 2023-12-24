import * as React from 'react'
import { useParams } from '@lib/router/context/route'

export function Post() {
  const { postId, userId } = useParams()

  return (
    <div>
      <h1>
        Post with {postId} from user {userId}
      </h1>
    </div>
  )
}
