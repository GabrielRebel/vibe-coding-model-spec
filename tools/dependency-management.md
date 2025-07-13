# VCMS Dependency Management Guide

**Version**: 2.2.0  
**Created**: 2025-07-13  
**Last Updated**: 2025-07-13

## 🎯 **Overview**

Proper dependency management prevents conflicts, ensures consistent environments, and makes projects portable across different machines and team members.

## 📦 **Node.js Dependency Management**

### **Package.json Best Practices**
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "dependencies": {
    "react": "18.2.0",
    "express": "4.18.2"
  },
  "devDependencies": {
    "typescript": "4.9.5",
    "ajv": "8.12.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}
```

### **Version Locking**
- **Always commit package-lock.json** to version control
- **Use exact versions** for critical dependencies
- **Use .nvmrc** for Node.js version control

### **Installation Commands**
```bash
# Install production dependencies
npm install --save package-name

# Install development dependencies
npm install --save-dev package-name

# Install exact version
npm install --save package-name@1.2.3

# Update dependencies
npm update

# Audit for security issues
npm audit
npm audit fix
```

## 🐍 **Python Virtual Environments**

### **Creating Virtual Environments**
```bash
# Create virtual environment
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate

# Deactivate
deactivate
```

### **Dependency Management**
```bash
# Install from requirements.txt
pip install -r requirements.txt

# Generate requirements.txt
pip freeze > requirements.txt

# Install specific version
pip install package-name==1.2.3

# Update all packages
pip install --upgrade -r requirements.txt
```

### **Requirements.txt Example**
```
# Core dependencies
flask==2.3.3
sqlalchemy==2.0.21

# Development dependencies
pytest==7.4.2
black==23.7.0
```

## 🔧 **Mixed Language Projects**

### **Project Structure**
```
project/
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   └── .nvmrc
├── backend/
│   ├── requirements.txt
│   ├── venv/
│   └── .python-version
└── README.md
```

### **Environment Setup Scripts**
```bash
# setup.sh (Linux/macOS)
#!/bin/bash
# Frontend setup
cd frontend
npm install

# Backend setup
cd ../backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

```powershell
# setup.ps1 (Windows)
# Frontend setup
cd frontend
npm install

# Backend setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## 🚨 **Common Issues & Solutions**

### **Global vs Local Installation**
**Problem**: Installing packages globally causes conflicts
**Solution**: Always use local installation
```bash
# ❌ Wrong - Global installation
npm install -g package-name

# ✅ Correct - Local installation
npm install --save package-name
```

### **Version Conflicts**
**Problem**: Different versions in different environments
**Solution**: Use lock files and exact versions
```bash
# Commit lock files
git add package-lock.json
git add requirements.txt

# Use exact versions
npm install --save package-name@1.2.3
pip install package-name==1.2.3
```

### **Cache Issues**
**Problem**: Stale cache causing installation problems
**Solution**: Clear cache and reinstall
```bash
# Node.js
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Python
pip cache purge
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 📋 **Environment Setup Checklist**

### **Before Starting Development**
- [ ] Project has isolated directory
- [ ] Dependencies documented in package.json/requirements.txt
- [ ] Lock files committed to version control
- [ ] Environment setup documented in README
- [ ] Version requirements specified (.nvmrc, .python-version)

### **During Development**
- [ ] All dependencies installed locally
- [ ] Virtual environment activated (Python)
- [ ] Dependencies updated when adding new packages
- [ ] Lock files updated and committed
- [ ] Security audits run regularly

### **Before Deployment**
- [ ] All dependencies locked to specific versions
- [ ] Environment variables documented
- [ ] Build process tested in clean environment
- [ ] Dependencies audited for security issues

## 🔄 **CI/CD Integration**

### **GitHub Actions Example**
```yaml
name: Build and Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version-file: '.python-version'
          cache: 'pip'
      
      - name: Install dependencies
        run: |
          npm ci
          pip install -r requirements.txt
      
      - name: Run tests
        run: |
          npm test
          pytest
```

## 📚 **Best Practices Summary**

1. **Always use local dependencies** - Never install globally
2. **Lock dependency versions** - Use package-lock.json and requirements.txt
3. **Document environment setup** - Include setup instructions in README
4. **Use virtual environments** - Isolate project dependencies
5. **Regular security audits** - Check for vulnerable dependencies
6. **Consistent package managers** - Don't mix npm/yarn or pip/conda
7. **Version control lock files** - Commit package-lock.json and requirements.txt
8. **Environment isolation** - Each project should have its own environment

---

**Last Updated**: 2025-07-13  
**Document Owner**: VCMS Team 