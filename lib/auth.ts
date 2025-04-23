type UserCredentials = {
  username: string
  password: string
  userType: "administrator" | "student"
}

type AuthResult = {
  success: boolean
  error?: string
  user?: {
    id: string
    username: string
    userType: "administrator" | "student"
    name: string
  }
}

// Mock user database
const users = [
  {
    id: "admin1",
    username: "admin",
    password: "admin123",
    userType: "administrator" as const,
    name: "Admin User",
  },
  {
    id: "student1",
    username: "student",
    password: "student123",
    userType: "student" as const,
    name: "Student User",
  },
]

export async function authenticate(credentials: UserCredentials): Promise<AuthResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by username
  const user = users.find((u) => u.username === credentials.username)

  // Check if user exists and password matches
  if (!user) {
    return { success: false, error: "Invalid username or password" }
  }

  if (user.password !== credentials.password) {
    return { success: false, error: "Invalid username or password" }
  }

  // Check if user type matches
  if (user.userType !== credentials.userType) {
    return {
      success: false,
      error: `You are not registered as a ${credentials.userType}`,
    }
  }

  // Authentication successful
  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      userType: user.userType,
      name: user.name,
    },
  }
}

