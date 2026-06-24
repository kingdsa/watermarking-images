import { ref, onMounted, onUnmounted } from 'vue'

const SYNC_INTERVAL = 3000 // 3 seconds
const EXPIRE_TIME = 10000 // 10 seconds
const STORAGE_KEY = 'watermark_online_users'

interface UserSession {
  id: string
  timestamp: number
}

interface OnlineData {
  sessions: UserSession[]
}

// Generate a unique session ID for this user
const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Get current session ID (create if not exists)
let currentSessionId: string | null = null
const getSessionId = (): string => {
  if (!currentSessionId) {
    currentSessionId = generateSessionId()
  }
  return currentSessionId
}

// Read online data from localStorage
const readOnlineData = (): OnlineData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return { sessions: [] }
    return JSON.parse(data) as OnlineData
  } catch {
    return { sessions: [] }
  }
}

// Write online data to localStorage
const writeOnlineData = (data: OnlineData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Ignore storage errors
  }
}

// Clean expired sessions
const cleanExpiredSessions = (sessions: UserSession[]): UserSession[] => {
  const now = Date.now()
  return sessions.filter(session => now - session.timestamp < EXPIRE_TIME)
}

// Update current user's timestamp
const updateUserPresence = (): void => {
  const sessionId = getSessionId()
  const data = readOnlineData()

  // Clean expired sessions
  let sessions = cleanExpiredSessions(data.sessions)

  // Update or add current session
  const sessionIndex = sessions.findIndex(s => s.id === sessionId)
  if (sessionIndex >= 0) {
    sessions[sessionIndex].timestamp = Date.now()
  } else {
    sessions.push({ id: sessionId, timestamp: Date.now() })
  }

  writeOnlineData({ sessions })
}

// Remove current user's session
const removeUserPresence = (): void => {
  const sessionId = getSessionId()
  const data = readOnlineData()

  const sessions = data.sessions.filter(s => s.id !== sessionId)
  writeOnlineData({ sessions })
}

// Calculate online count
const calculateOnlineCount = (): number => {
  const data = readOnlineData()
  const sessions = cleanExpiredSessions(data.sessions)

  // Update storage with cleaned sessions
  writeOnlineData({ sessions })

  return sessions.length
}

export function useOnlineUsers() {
  const onlineCount = ref(0)
  let intervalId: number | null = null

  const updateCount = () => {
    onlineCount.value = calculateOnlineCount()
  }

  const startTracking = () => {
    // Initial presence update
    updateUserPresence()
    updateCount()

    // Set up periodic updates
    intervalId = window.setInterval(() => {
      updateUserPresence()
      updateCount()
    }, SYNC_INTERVAL)

    // Clean up on page unload
    window.addEventListener('beforeunload', removeUserPresence)
  }

  const stopTracking = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    removeUserPresence()
    window.removeEventListener('beforeunload', removeUserPresence)
  }

  onMounted(() => {
    startTracking()
  })

  onUnmounted(() => {
    stopTracking()
  })

  return {
    onlineCount
  }
}
