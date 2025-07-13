# Human + AI Vibe Coding Workflow

**Version**: 2.2.0  
**Created**: 2025-07-12  
**Last Updated**: 2025-07-13  
**Status**: Active

## 📋 **WORKFLOW VERSION HISTORY**
| Version | Date | Changes | Author |
|---------|------|---------|---------|
| 2.2.0 | 2025-07-13 | Version consistency update and framework cleanup | VCMS Team |

---

## 🎯 **OVERVIEW**

This workflow provides a structured, repeatable process for building products using the **Vibe Coding Model Spec (VCMS)** framework. It's designed to work for both human developers and AI/no-code tools, preventing common development failures and ensuring high-quality outcomes.

### **What This Workflow Solves**
- **Scope creep** - Clear boundaries and validation checkpoints
- **Ambiguity** - Specific, measurable requirements
- **Poor handoffs** - Standardized documentation and templates
- **Context loss** - Version tracking and decision documentation
- **Quality issues** - Validation hooks and anti-overreach protocols

---

## 🚀 **WORKFLOW PHASES**

### **Phase 1: Foundation Setup**
**Goal**: Establish project structure and templates  
**Timeline**: Day 1  
**Deliverables**: Templates, repository structure, project setup

### **Phase 2: Requirements Documentation**
**Goal**: Create comprehensive business and technical requirements  
**Timeline**: Days 2-3  
**Deliverables**: PRD, Model Spec, Validation Checklist

### **Phase 3: Development Handoff**
**Goal**: Validate requirements and begin development  
**Timeline**: Day 4  
**Deliverables**: Validated requirements, development environment

### **Phase 4: Build & Iterate**
**Goal**: Implement features and track progress  
**Timeline**: Days 5+  
**Deliverables**: Working product, metrics tracking

---

## 📋 **STEP-BY-STEP PROCESS**

### **Step 1: Template Creation & Repository Setup**

#### **1.1 Create Template Repository**
```bash
# Create template repository structure
mkdir template-repo
cd template-repo
mkdir templates examples
```

#### **1.2 Create Core Templates**
Create these 4 templates using the VCMS framework:
- **PRD Template** - Business/user requirements
- **Model Spec Template** - Technical implementation
- **Validation Checklist Template** - Pre-build validation
- **Change Log Template** - Version tracking

#### **1.3 Set Up Version Control**
```bash
git init
git add .
git commit -m "Initial commit: VCMS Project Templates v1.0.0"
```

#### **1.4 Push to GitHub**
- Create GitHub repository (e.g., `vcms-templates`)
- Add remote origin
- Push templates for community access

**Example**: TaskMate templates are available at [https://github.com/GabrielRebel/vcms-templates](https://github.com/GabrielRebel/vcms-templates)

---

### **Step 2: Project Initialization**

#### **2.1 Create Project Structure**
```bash
mkdir project-name
cd project-name
mkdir docs src frontend backend
```

#### **2.2 Copy Templates**
```bash
# Option 1: Copy from local template repository
cp ../template-repo/templates/*.md docs/

# Option 2: Download from GitHub
curl -O https://raw.githubusercontent.com/[username]/vcms-templates/main/templates/PRD-Template.md
curl -O https://raw.githubusercontent.com/[username]/vcms-templates/main/templates/Model-Spec-Template.md
curl -O https://raw.githubusercontent.com/[username]/vcms-templates/main/templates/Validation-Checklist-Template.md
curl -O https://raw.githubusercontent.com/[username]/vcms-templates/main/templates/Change-Log-Template.md
```

#### **2.3 Initialize Project Documentation**
- Rename templates to project-specific names
- Update template version history
- Set project-specific metadata

**Example**: TaskMate has `docs/PRD.md`, `docs/Validation-Checklist.md`, `docs/Change-Log.md`

---

### **Step 3: Requirements Documentation**

#### **3.1 Create Product Requirements Document (PRD)**
**Purpose**: Define business requirements, user needs, and success criteria

**Key Sections to Complete**:
- Executive Summary (what, why, who, success)
- Problem & Opportunity (pain points, market validation)
- Users & Use Cases (personas, scenarios)
- Solution Overview (core features, scope boundaries)
- Success Metrics (specific, measurable targets)
- Launch Plan (phases, go-to-market strategy)
- Risks & Assumptions (mitigation strategies)

**Example**: TaskMate PRD defines 70% task drop-off reduction, 95% accuracy targets

#### **3.2 Create Model/Technical Specification**
**Purpose**: Define technical implementation, atomic components, and constraints

**Key Sections to Complete**:
- System Architecture (technology stack, platform strategy)
- Atomic Components (purpose, input/output, dependencies, anti-overreach)
- Implementation Plan (phased approach with deliverables)
- Technical Constraints (code quality, performance, security)
- Anti-Overreach Protocols (component boundaries)
- Test Cases (success/failure scenarios)
- Validation Hooks (quality gates)

**Example**: TaskMate Model Spec defines CHAT-01, TASK-02, NOTIFY-03 atomic components

#### **3.3 Multi-LLM Refinement Process**
**Purpose**: Improve specification quality through multiple AI perspectives

**Process**:
1. **Initial Draft** - Create first version of spec
2. **DeepSeek Review** - Technical architecture and anti-overreach
3. **Claude Review** - MVP refinement and developer handoff
4. **ChatGPT Review** - UX/flow optimization and developer speed
5. **Final Review** - Implementation readiness check

**Example**: TaskMate spec refined through 3 LLM iterations (v1.0 → v1.3)

---

### **Step 4: Pre-Build Validation**

#### **4.1 Create Validation Checklist**
**Purpose**: Ensure all requirements are complete before development begins

**Key Validation Areas**:
- Business Requirements (problem, users, metrics, scope)
- Technical Requirements (stack, architecture, components, constraints)
- Documentation Complete (PRD, Model Spec, templates used)
- Content Quality (executive summary, problem statement, use cases)
- Common Pitfalls (scope creep, ambiguity, technical debt)
- Ready to Build (team alignment, environment, success criteria)

**Example**: TaskMate validation shows "Ready to Build" with high confidence

#### **4.2 Stakeholder Approval**
**Purpose**: Get sign-off from all stakeholders before development

**Required Approvals**:
- Product Manager
- Engineering Lead
- Design Lead
- Business Stakeholder

**Example**: TaskMate has approval checkboxes for each stakeholder

---

### **Step 5: Development Handoff**

#### **5.1 Environment Setup**
```bash
# Frontend setup (React + TypeScript)
npx create-react-app frontend --template typescript
cd frontend
npm install

# Backend setup (Node.js + Express)
cd ../backend
npm init -y
npm install express cors dotenv

# Create version control files
echo "16.20.0" > frontend/.nvmrc
echo "3.11.0" > backend/.python-version  # If using Python
```

#### **5.2 Dependency Management**
**Follow these steps to prevent conflicts:**

1. **Install dependencies locally only**
   ```bash
   # ❌ Never do this
   npm install -g package-name
   
   # ✅ Always do this
   npm install --save package-name
   ```

2. **Lock dependency versions**
   ```bash
   # Commit lock files to version control
   git add package-lock.json
   git add requirements.txt  # If using Python
   ```

3. **Document specific versions**
   ```bash
   # For critical dependencies, use exact versions
   npm install --save react@18.2.0
   npm install --save-dev typescript@4.9.5
   ```

4. **Create environment setup scripts**
   ```bash
   # setup.sh (Linux/macOS) or setup.ps1 (Windows)
   # Document in README how to set up the environment
   ```

#### **5.2 Project Structure**
```
project-name/
├── docs/
│   ├── PRD.md
│   ├── Model-Spec.md
│   ├── Validation-Checklist.md
│   └── Change-Log.md
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

#### **5.3 Development Guidelines**
- Follow atomic component boundaries
- Implement validation hooks
- Maintain code quality standards
- Track progress in Change Log

---

### **Step 6: Build & Iterate**

#### **6.1 Implement Atomic Components**
**Process**:
1. Implement one component at a time
2. Follow anti-overreach protocols
3. Add validation hooks
4. Test against specifications
5. Update Change Log

#### **6.2 Session Management**
**After each development session**:
1. Create session summary using template
2. Document all issues and solutions
3. Update Change Log with key learnings
4. Identify next session priorities
5. Assess context window usage and documentation quality

**Session Summary Template**: `templates/Session-Summary-Template.md`

**Example**: TaskMate implements CHAT-01, TASK-02, NOTIFY-03 sequentially

#### **6.2 Track Progress**
**Metrics to Monitor**:
- Development velocity
- Quality metrics (bugs, performance)
- User feedback
- Success criteria progress

**Example**: TaskMate tracks 70% task drop-off reduction, 95% accuracy

#### **6.3 Iterate Based on Learnings**
**Process**:
1. Collect user feedback
2. Update Change Log with learnings
3. Refine specifications if needed
4. Implement improvements
5. Track impact

---

## 🎯 **WORKFLOW EXAMPLES**

### **TaskMate Project Example**

#### **Phase 1: Foundation (Completed)**
- ✅ Created 4 VCMS templates
- ✅ Set up GitHub repository
- ✅ Added version tracking
- ✅ Pushed to community

#### **Phase 2: Requirements (Completed)**
- ✅ Created TaskMate PRD (business requirements)
- ✅ Used existing Model Spec (technical requirements)
- ✅ Created Validation Checklist (pre-build validation)
- ✅ Created Change Log (decision tracking)

#### **Phase 3: Handoff (In Progress)**
- ✅ Validated requirements
- 🔄 Setting up development environment
- 🔄 Preparing for build phase

#### **Phase 4: Build (Planned)**
- 🔄 Implement CHAT-01 (chat interface)
- 🔄 Implement TASK-02 (task extraction)
- 🔄 Implement NOTIFY-03 (notifications)
- 🔄 Deploy MVP

---

## ⚠️ **COMMON PITFALLS & SOLUTIONS**

### **Pitfall 1: Skipping Requirements Documentation**
**Problem**: Jumping straight to development without clear requirements
**Solution**: Always complete PRD and Model Spec before building
**Example**: TaskMate spent 3 days on requirements, preventing scope creep

### **Pitfall 2: Ignoring Validation**
**Problem**: Building without ensuring requirements are complete
**Solution**: Use Validation Checklist before development handoff
**Example**: TaskMate validation caught missing stakeholder approvals

### **Pitfall 3: Not Tracking Decisions**
**Problem**: Forgetting why decisions were made
**Solution**: Document all decisions with rationale in Change Log
**Example**: TaskMate tracks 9 key decisions with impact assessment

### **Pitfall 4: Scope Creep**
**Problem**: Adding features outside original scope
**Solution**: Explicit "What We're NOT Building" sections
**Example**: TaskMate explicitly excludes team features in Phase 1

### **Pitfall 5: TypeScript Version Conflicts**
**Problem**: TypeScript 5.x compatibility issues with React Scripts
**Solution**: Downgrade to TypeScript 4.x or use compatible React Scripts version
**Example**: TaskMate required TypeScript 4.9.5 for React 18 compatibility
**Command**: `npm install typescript@4.9.5 --save-dev`

### **Pitfall 6: AJV Module Dependency Issues**
**Problem**: AJV module errors persisting after clean reinstall
**Solution**: Explicitly install correct AJV version for React Scripts compatibility
**Example**: TaskMate required explicit AJV installation to resolve dependency conflicts
**Command**: `npm install ajv@8.12.0 --save-dev`

---

## 🔧 **TROUBLESHOOTING GUIDE**

### **Error Resolution Protocol**
**When encountering any error, follow the standardized 5-phase process:**

1. **Error Identification (5 min)** - Capture exact error message and classify type
2. **Critical Analysis (10 min)** - Research root cause and prioritize investigation
3. **Solution Development (15 min)** - Test hypotheses and implement fix
4. **Validation & Testing (10 min)** - Verify fix and check for side effects
5. **Documentation & Learning (10 min)** - Update guides and capture learnings

**Full protocol**: See `tools/error-resolution-protocol.md`

### **Development Environment Issues**

#### **Dependency Management & Virtual Environments**
**Purpose**: Prevent dependency conflicts and ensure consistent development environments

**Best Practices**:
1. **Use package.json for Node.js projects**
   - Lock dependency versions with package-lock.json
   - Separate devDependencies from dependencies
   - Use exact versions for critical packages

2. **Use virtual environments for Python projects**
   - Create isolated environments per project
   - Use requirements.txt for dependency tracking
   - Never install packages globally

3. **Version Management**
   - Document specific versions in project setup
   - Use .nvmrc for Node.js version control
   - Use .python-version for Python version control

**Common Pitfalls**:
- Installing packages globally instead of locally
- Not locking dependency versions
- Mixing different package managers
- Not documenting environment setup steps

**Solution Steps**:
```bash
# Node.js Project Setup
npm init -y
npm install --save-dev typescript@4.9.5
npm install --save react@18.2.0
npm install --save-dev ajv@8.12.0

# Python Project Setup
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
pip freeze > requirements.txt
```

#### **Environment Isolation Checklist**
- [ ] Project has its own directory
- [ ] Dependencies installed locally (not globally)
- [ ] Version files documented (.nvmrc, .python-version)
- [ ] Lock files committed to version control
- [ ] Environment setup documented in README
- [ ] CI/CD uses same environment as development

#### **Dependency Version Conflicts**
**Symptoms**:
- Different behavior in different environments
- "Module not found" errors despite installation
- Inconsistent builds across team members

**Root Cause**: Different versions of same package in different environments

**Solution Steps**:
1. Delete node_modules and package-lock.json
2. Clear npm cache: `npm cache clean --force`
3. Reinstall with exact versions: `npm install`
4. Document specific versions in troubleshooting guide

#### **Virtual Environment Best Practices**
**For Node.js**:
- Use npm or yarn consistently (don't mix)
- Commit package-lock.json or yarn.lock
- Use .nvmrc for Node.js version
- Document minimum Node.js version

**For Python**:
- Always use virtual environments
- Use requirements.txt for dependencies
- Use pip-tools for dependency management
- Document Python version requirements

**For Mixed Projects**:
- Separate frontend/backend dependencies
- Use different package managers per language
- Document setup steps for each environment
- Use Docker for consistent environments

#### **TypeScript Version Conflicts**
**Symptoms**: 
- TypeScript compilation errors
- React Scripts compatibility warnings
- Type definition conflicts

**Root Cause**: React Scripts 5.x requires TypeScript 4.x, not 5.x

**Solution Steps**:
1. Check current TypeScript version: `npx tsc --version`
2. If version is 5.x, downgrade: `npm install typescript@4.9.5 --save-dev`
3. Clear cache: `npm cache clean --force`
4. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

**Prevention**: Always check React Scripts compatibility before upgrading TypeScript

#### **AJV Module Dependency Issues**
**Symptoms**:
- AJV module not found errors
- Dependency resolution conflicts
- Clean reinstall doesn't fix the issue

**Root Cause**: React Scripts has specific AJV version requirements

**Solution Steps**:
1. Remove existing AJV: `npm uninstall ajv`
2. Install specific version: `npm install ajv@8.12.0 --save-dev`
3. Clear node_modules: `rm -rf node_modules package-lock.json`
4. Reinstall: `npm install`
5. If issue persists: `npm install ajv@8.12.0 --force`

**Prevention**: Document specific dependency versions in project setup

#### **React Scripts Compatibility Matrix**
| React Scripts Version | TypeScript Version | AJV Version | Node.js Version |
|----------------------|-------------------|-------------|-----------------|
| 5.0.1 | 4.9.5 | 8.12.0 | 16.x+ |
| 4.0.3 | 4.1.2 | 6.12.6 | 14.x+ |
| 3.4.4 | 3.9.7 | 6.12.6 | 12.x+ |

### **Common Error Messages & Solutions**

#### **"Module not found: Can't resolve 'ajv'"`
```bash
# Solution
npm install ajv@8.12.0 --save-dev
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### **"TypeScript version 5.x is not supported"**
```bash
# Solution
npm install typescript@4.9.5 --save-dev
npm install @types/node@16 --save-dev
```

#### **"Cannot find module 'react-scripts'"**
```bash
# Solution
npm install react-scripts@5.0.1 --save-dev
```

#### **"Module not found: Error: Can't resolve './App'"**
```bash
# Solution - Check file structure
ls src/App.tsx
# If missing, create App.tsx or fix import in index.tsx
# This is NOT a dependency issue - it's a file structure issue
```

### **Development Environment Startup**

#### **Option 1: Automated Startup (Recommended)**
```powershell
# From project root directory
.\start-dev.ps1
```

This script automatically:
- Starts both backend and frontend servers
- Handles port conflicts automatically
- Provides status monitoring
- Opens browser when ready

#### **Option 2: Manual Startup**
1. **Backend Startup**:
   ```powershell
   cd "path/to/project/src/backend"
   npm start
   ```

2. **Frontend Startup** (in new terminal):
   ```powershell
   cd "path/to/project/src/frontend"
   npm start
   ```

3. **Port Conflict Resolution**: If port 3000 is occupied, React will prompt for alternative port

### **Environment Setup Checklist**
- [ ] Node.js version 16.x or higher
- [ ] TypeScript 4.9.5 (not 5.x)
- [ ] AJV 8.12.0 explicitly installed
- [ ] React Scripts 5.0.1
- [ ] Clean node_modules and package-lock.json
- [ ] All dependencies installed successfully
- [ ] App.tsx file exists in src/ directory
- [ ] Import statements match actual filenames (case-sensitive)
- [ ] Automated startup script created (start-dev.ps1)

---

## 🔧 **WORKFLOW CUSTOMIZATION**

### **For Different Project Types**

#### **MVP Projects**
- Focus on core features only
- Use rapid iteration cycles
- Emphasize user feedback
- Keep documentation minimal but complete

#### **Enterprise Projects**
- Add security requirements
- Include compliance documentation
- Expand stakeholder approval process
- Add performance benchmarks

#### **Open Source Projects**
- Add contributing guidelines
- Include community feedback loops
- Emphasize documentation quality
- Add license considerations

### **For Different Team Sizes**

#### **Solo Developer**
- Combine PRD and Model Spec if needed
- Simplify approval process
- Focus on self-validation
- Use automated tools

#### **Small Team (2-5 people)**
- Separate PRD and Model Spec
- Include all team members in approval
- Regular sync meetings
- Shared Change Log

#### **Large Team (10+ people)**
- Detailed stakeholder matrix
- Formal approval gates
- Automated validation
- Dedicated documentation team

---

## 📊 **SUCCESS METRICS**

### **Workflow Effectiveness**
- **Time to First Deploy**: Target < 2 weeks
- **Requirements Clarity**: 95% stakeholder agreement
- **Scope Creep Prevention**: < 10% feature additions
- **Quality Issues**: < 5% post-launch bugs

### **Process Improvement**
- **Template Usage**: 100% of projects use templates
- **Validation Completion**: 100% pre-build validation
- **Decision Tracking**: All decisions documented
- **Learning Capture**: Lessons applied to future projects

---

## 🔄 **CONTINUOUS IMPROVEMENT**

### **Workflow Iteration Process**
1. **Collect Feedback** - From all project participants
2. **Identify Improvements** - Based on real project experience
3. **Update Templates** - Incorporate learnings
4. **Test Changes** - On new projects
5. **Document Results** - Update workflow

### **Template Evolution**
- **Version Control** - Track all template changes
- **Community Feedback** - Gather input from users
- **Best Practices** - Incorporate industry standards
- **Automation** - Add tools and scripts

---

## 📝 **GETTING STARTED**

### **Quick Start Checklist**
- [ ] Download templates from GitHub
- [ ] Create project structure
- [ ] Fill out PRD template
- [ ] Create Model Spec (or use existing)
- [ ] Complete Validation Checklist
- [ ] Set up Change Log
- [ ] Begin development

### **Resources**
- **Templates**: [https://github.com/GabrielRebel/vcms-templates](https://github.com/GabrielRebel/vcms-templates)
- **Example Project**: TaskMate (this workflow)
- **Documentation**: VCMS framework specifications
- **Community**: GitHub discussions and issues

---

**Workflow Status**: Active  
**Last Updated**: 2025-07-13  
**Next Review**: 2025-07-20  
**Document Owner**: VCMS Team 