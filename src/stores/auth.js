import { reactive, computed } from 'vue'

// Frontend-only demo auth. Users live in localStorage and passwords are
// hashed with SHA-256 so they are not stored in plain text. A real app needs
// a backend: browser-side checks can always be bypassed.

const USERS_KEY = 'minicartUsers'
const SESSION_KEY = 'minicartSession'

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

const hash = async (text) => {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const state = reactive({ user: read(SESSION_KEY, null) })

export const isLoggedIn = computed(() => !!state.user)
export const currentUser = computed(() => state.user)

export async function register({ name, email, password }) {
  const users = read(USERS_KEY, [])
  const normalized = email.trim().toLowerCase()

  if (users.some((u) => u.email === normalized)) {
    throw new Error('An account with this email already exists.')
  }

  users.push({ name: name.trim(), email: normalized, passwordHash: await hash(password) })
  write(USERS_KEY, users)
}

export async function login({ email, password }) {
  const users = read(USERS_KEY, [])
  const normalized = email.trim().toLowerCase()
  const user = users.find((u) => u.email === normalized)

  if (!user || user.passwordHash !== (await hash(password))) {
    throw new Error('Invalid email or password.')
  }

  state.user = { name: user.name, email: user.email }
  write(SESSION_KEY, state.user)
}

export function logout() {
  state.user = null
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}
