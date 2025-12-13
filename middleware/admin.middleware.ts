import type { Response, NextFunction } from "express"
import type { AuthenticatedRequest } from "./auth.middleware.js"

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  if (req.user.role !== "ADMIN") {
    res.status(403).json({ message: "Admin access required" })
    return
  }

  next()
}
