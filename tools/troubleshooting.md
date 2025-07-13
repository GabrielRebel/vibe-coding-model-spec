# VCMS Troubleshooting Quick Reference

**Version**: 2.2.0  
**Created**: 2025-07-13  
**Last Updated**: 2025-07-13

## 🚨 **Common Issues & Quick Fixes**

### **TypeScript Version Conflicts**
**Error**: TypeScript 5.x compatibility issues with React Scripts
**Quick Fix**: 
```bash
npm install typescript@4.9.5 --save-dev
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **AJV Module Not Found**
**Error**: "Module not found: Can't resolve 'ajv'"
**Quick Fix**:
```bash
npm install ajv@8.12.0 --save-dev
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **React Scripts Compatibility**
**Error**: "Cannot find module 'react-scripts'"
**Quick Fix**:
```bash
npm install react-scripts@5.0.1 --save-dev
```

### **Missing App Component Error**
**Error**: "Module not found: Error: Can't resolve './App' in '.../src'"
**Root Cause**: Missing or misnamed App.tsx file, not a dependency issue
**Quick Fix**:
```bash
# Check if App.tsx exists
ls src/App.tsx

# If missing, create it or check the import in index.tsx
# Make sure the import matches the actual filename (case-sensitive)
```
**Note**: This error can mask as a dependency issue but is actually a file structure problem

### **Missing TypeScript Configuration**
**Error**: "Module not found: Error: Can't resolve './App'" (even when file exists)
**Root Cause**: Missing tsconfig.json file in React TypeScript project
**Quick Fix**:
```bash
# Create tsconfig.json with React Scripts defaults
# Or run: npx create-react-app --template typescript temp-project && cp temp-project/tsconfig.json .
```
**Note**: React Scripts requires tsconfig.json for TypeScript projects

### **Dependency Version Conflicts**
**Error**: Different behavior in different environments, "Module not found" despite installation
**Root Cause**: Different versions of same package in different environments
**Quick Fix**:
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# For Python projects
rm -rf venv
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```
**Note**: Always use local dependencies, never global installations

### **Missing Script: 'start' Error**
**Error:**
```
npm error Missing script: "start"
```
**Root Cause:**
- Running `npm start` in the wrong directory (no package.json or wrong package.json)
- `package.json` missing a "start" script

**Solution:**
- Navigate to the correct directory (where the correct package.json exists)
- Run `npm run` to see available scripts
- If missing, add to package.json:
  ```json
  "scripts": {
    "start": "node server.js"
  }
  ```
- Save the file and try `npm start` again

---

### **PowerShell Command Chaining Error**
**Error:**
```
The token '&&' is not a valid statement separator in this version.
```
**Root Cause:**
- PowerShell does not support `&&` for chaining commands (unlike bash)

**Solution:**
- Run commands one at a time in PowerShell
- Or use `;` to separate commands (with limitations)
- For multi-step setup, use a script file (e.g., setup.ps1)

**Example:**
```powershell
# Instead of this (bash):
cd frontend && npm install
# Do this (PowerShell):
cd frontend
npm install
```

**Note:** Always specify the working directory for each command in documentation and setup guides.

### **Terminal Loop/Interruption Issues**
**Symptoms:**
- Commands getting cut off mid-execution
- Terminal losing directory context
- Same commands repeating without progress
- PowerShell commands not completing

**Root Cause:**
- Multiple terminal sessions conflicting
- Background processes interfering
- PowerShell command chaining issues
- Context window limitations

**Solution:**
- Close all terminal windows and open fresh
- Run commands one at a time (no chaining)
- Use `Get-Location` to verify current directory
- If stuck, restart terminal completely

## 📋 **Environment Setup Checklist**

Before starting any VCMS project:
- [ ] Node.js 16.x or higher
- [ ] TypeScript 4.9.5 (not 5.x)
- [ ] AJV 8.12.0 explicitly installed
- [ ] React Scripts 5.0.1
- [ ] Clean node_modules and package-lock.json
- [ ] tsconfig.json exists for TypeScript projects
- [ ] App.tsx file exists in src/ directory

## 🔧 **Compatibility Matrix**

| Component | Version | Notes |
|-----------|---------|-------|
| React Scripts | 5.0.1 | Latest stable |
| TypeScript | 4.9.5 | Required for React Scripts 5.x |
| AJV | 8.12.0 | Explicit version required |
| Node.js | 16.x+ | Minimum requirement |

## 📚 **Full Documentation**

For detailed troubleshooting steps, see:
- [Vibe-Coding-Workflow.md](../Vibe-Coding-Workflow.md#troubleshooting-guide)
- [TaskMate Change Log](../projects/taskmate/docs/Change-Log.md#what-didnt-work)

---

**Last Updated**: 2025-07-13  
**Document Owner**: VCMS Team 