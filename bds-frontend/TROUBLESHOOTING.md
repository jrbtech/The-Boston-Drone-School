# Troubleshooting Guide

## Chunk Loading Errors

### Problem
You see an error like:
```
Loading chunk _app-pages-browser_components_XYZ failed
ChunkLoadError
```

### Cause
This happens when:
- Next.js build cache (`.next` directory) becomes stale
- Hot Module Replacement (HMR) loses track of code changes
- Dynamic imports fail to resolve properly
- Webpack chunks are not loading correctly

### Solutions

#### Quick Fix (Recommended)
```bash
npm run dev:clean
```

This will:
1. Clear the `.next` cache directory
2. Start a fresh development server

#### Manual Fix
```bash
# Stop the dev server (Ctrl+C)
npm run clean
npm run dev
```

#### Alternative Manual Steps
```bash
# 1. Stop dev server
# 2. Delete cache
rm -rf .next
# 3. Restart
npm run dev
```

### Prevention

1. **Use `dev:clean` when in doubt:**
   - After pulling new code
   - When switching branches
   - When dynamic imports are added/changed
   - After long idle periods

2. **Regular restarts:**
   - Restart dev server every few hours during active development
   - After making major structural changes

3. **Error Boundary Protection:**
   - Already implemented in `app/layout.tsx`
   - Catches runtime errors gracefully
   - Shows user-friendly error message

4. **Dynamic Import Best Practices:**
   - All dynamic imports have error handling
   - Example from `app/(site)/page.tsx`:
   ```tsx
   const Component = dynamic(() => 
     import("@/components/Component").catch(() => ({
       default: () => null
     })), 
     { ssr: false, loading: () => null }
   );
   ```

## Other Common Issues

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (Windows)
taskkill /F /PID <PID>

# Or use the kill port utility
npx kill-port 3000
```

### Cache Issues
```bash
# Nuclear option - clears everything
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Build Errors
```bash
# Clear cache and rebuild
npm run clean
npm run build
```

## Development Scripts

- `npm run dev` - Normal development server
- `npm run dev:clean` - Clean start (clears cache first)
- `npm run clean` - Clear build cache only
- `npm run build` - Production build
- `npm start` - Production server
- `npm run lint` - Run linter

## Getting Help

If issues persist:
1. Check the console for error messages
2. Look at the Network tab in DevTools
3. Try `npm run dev:clean`
4. Check if API backend is running
5. Verify environment variables in `.env.local`
