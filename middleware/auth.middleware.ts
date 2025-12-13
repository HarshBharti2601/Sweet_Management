import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string
    role: "USER" | "ADMIN"
  }
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      role: "USER" | "ADMIN"
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role
    }

    next()
  } catch {
    res.status(401).json({ message: "Invalid or expired token" })
  }
}