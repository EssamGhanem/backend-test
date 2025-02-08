const  rateLimit = require("express-rate-limit") ;

export const loginRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, 
  message: "Too many login attempts from this IP, please try again after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false, 
});

// git commit -m "add rate-limit on login api for more security and make accessToken regeneration using refesh token" 