import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
export const socket = io('http://localhost:8080/')

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastPong, setLastPong] = useState<string | null>(null)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('pong', () => {
      setLastPong(new Date().toISOString())
    })

    socket.on('room_sensor', (data) => {
      console.log(data)
    })

    return () => {
      socket.off('room_sensor')
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    }
  }, [])

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
    </div>
  )
}
