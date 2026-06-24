import { ref, onMounted, onUnmounted } from 'vue'
import { database } from '../config/firebase'
import { ref as dbRef, onValue, onDisconnect, set, serverTimestamp } from 'firebase/database'

export function useOnlineUsers() {
  const onlineCount = ref(0)
  let myConnectionRef: any = null

  const startTracking = () => {
    // Reference to the online users list
    const connectionsRef = dbRef(database, 'online_users')

    // Generate a unique connection ID for this user
    const myConnectionId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    myConnectionRef = dbRef(database, `online_users/${myConnectionId}`)

    // Listen for changes to the online users count
    onValue(connectionsRef, (snapshot) => {
      const data = snapshot.val()
      onlineCount.value = data ? Object.keys(data).length : 0
    })

    // When this user connects, add them to the list
    set(myConnectionRef, {
      timestamp: serverTimestamp(),
      connected: true
    })

    // When this user disconnects (closes tab, loses connection), remove them
    onDisconnect(myConnectionRef).remove()
  }

  const stopTracking = () => {
    // Remove this user when component unmounts
    if (myConnectionRef) {
      set(myConnectionRef, null)
    }
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
