import type { Request, Response, NextFunction } from "express";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Assume role is attached after JWT decode
  const isAdminUser = true;

  if (!isAdminUser) {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};
