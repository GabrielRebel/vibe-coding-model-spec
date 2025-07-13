# VCMS Error Resolution Protocol

**Version**: 2.2.0  
**Created**: 2025-07-13  
**Last Updated**: 2025-07-13

## 🎯 **Purpose**

Standardize the process of identifying, analyzing, resolving, and documenting errors to ensure consistent problem-solving across all VCMS projects.

## 📋 **Error Resolution Workflow**

### **Phase 1: Error Identification (5 minutes)**
**Goal**: Clearly understand what the error is

**Steps**:
1. **Capture the exact error message**
   - Copy/paste the full error text
   - Note the context (command, file, line number)
   - Record the environment (OS, versions, etc.)

2. **Classify the error type**
   - Dependency issue (missing packages, version conflicts)
   - Configuration issue (missing files, wrong settings)
   - Code issue (syntax, logic, imports)
   - Environment issue (permissions, paths, variables)
   - Unknown (requires investigation)

3. **Document initial observations**
   ```markdown
   ## Error Report
   **Date**: [Date]
   **Error Type**: [Classification]
   **Error Message**: [Exact text]
   **Context**: [What was being done]
   **Environment**: [OS, versions, etc.]
   ```

### **Phase 2: Critical Analysis (10 minutes)**
**Goal**: Understand the root cause

**Steps**:
1. **Ask diagnostic questions**
   - What was the last working state?
   - What changed recently?
   - Is this a known issue?
   - Are there similar errors in the project?

2. **Research potential causes**
   - Check troubleshooting guides
   - Search for similar errors online
   - Review recent changes
   - Test hypotheses systematically

3. **Prioritize investigation paths**
   - Most likely cause first
   - Quickest to test first
   - Most impactful if wrong

### **Phase 3: Solution Development (15 minutes)**
**Goal**: Find and implement the fix

**Steps**:
1. **Generate solution hypotheses**
   - List 3-5 possible solutions
   - Rank by likelihood and effort
   - Start with lowest effort, highest likelihood

2. **Test solutions systematically**
   - One change at a time
   - Document each attempt
   - Revert if it doesn't work

3. **Implement the working solution**
   - Apply the fix
   - Test that it resolves the error
   - Verify no new issues introduced

### **Phase 4: Validation & Testing (10 minutes)**
**Goal**: Ensure the fix is complete and correct

**Steps**:
1. **Test the fix**
   - Run the original command/process
   - Verify error is resolved
   - Check for side effects

2. **Regression testing**
   - Test related functionality
   - Ensure no new errors introduced
   - Validate the fix doesn't break other things

3. **Document the solution**
   - Record exactly what was done
   - Note any important details
   - Update troubleshooting guides

### **Phase 5: Documentation & Learning (10 minutes)**
**Goal**: Capture knowledge for future use

**Steps**:
1. **Update documentation**
   - Add to troubleshooting guide
   - Update environment checklist
   - Record in project change log

2. **Identify process improvements**
   - Could this error have been prevented?
   - What would make debugging easier next time?
   - Are there tools or processes to add?

3. **Share learnings**
   - Update team documentation
   - Add to VCMS framework
   - Consider if this is a common pattern

## PowerShell-Specific Error Documentation

- Always check if command syntax is compatible with PowerShell (e.g., `&&` is not supported)
- Document any shell-specific issues in troubleshooting guides
- Provide PowerShell-compatible command examples in documentation
- Recommend using setup scripts (e.g., setup.ps1) for multi-step processes
- Add a note to README/setup guides about shell differences

## 📊 **Error Classification Matrix**

| Error Type | Frequency | Impact | Resolution Time | Prevention Strategy |
|------------|-----------|---------|-----------------|-------------------|
| Dependency | High | Medium | 15-30 min | Lock versions, use local installs |
| Configuration | Medium | High | 10-20 min | Templates, validation scripts |
| Code | Medium | Medium | 5-15 min | Linting, type checking |
| Environment | Low | High | 20-45 min | Documentation, setup scripts |
| Unknown | Low | Variable | 30+ min | Systematic debugging |

## 🔧 **Standard Error Resolution Template**

```markdown
## Error Resolution Report

### Error Details
- **Date**: [Date]
- **Error Type**: [Classification]
- **Error Message**: [Exact text]
- **Context**: [What was being done]
- **Environment**: [OS, versions, etc.]

### Analysis
- **Root Cause**: [What caused the error]
- **Investigation Path**: [How we found the cause]
- **Time to Resolution**: [Total time spent]

### Solution
- **Fix Applied**: [Exactly what was done]
- **Commands Used**: [Specific commands]
- **Files Modified**: [What files changed]

### Validation
- **Test Results**: [How we verified the fix]
- **Side Effects**: [Any new issues introduced]
- **Regression Tests**: [What else we tested]

### Documentation Updates
- [ ] Troubleshooting guide updated
- [ ] Environment checklist updated
- [ ] Project change log updated
- [ ] Team documentation updated

### Process Improvements
- **Prevention**: [How to prevent this error]
- **Detection**: [How to detect this earlier]
- **Resolution**: [How to fix this faster next time]
```

## ⏰ **When to Use This Protocol**

### **Always Use For:**
- Build/compilation errors
- Runtime errors that prevent development
- Environment setup issues
- Dependency conflicts
- Configuration problems

### **Optional For:**
- Minor warnings
- Style/linting issues
- Performance optimizations
- Feature enhancements

### **Frequency:**
- **Every error** during initial project setup
- **First occurrence** of any error type
- **When error resolution takes >10 minutes**
- **When multiple team members encounter same error**

## 🎯 **Success Metrics**

### **Resolution Quality**
- Error resolved completely
- No new errors introduced
- Solution documented for future use
- Process improved for next time

### **Efficiency Metrics**
- Time to identify root cause
- Number of attempted solutions
- Time to complete resolution
- Documentation completeness

### **Learning Capture**
- Error added to troubleshooting guide
- Prevention strategy implemented
- Team knowledge updated
- Framework enhanced

## 📚 **Integration with VCMS Workflow**

### **In Development Phase**
1. **Error occurs** → Follow protocol
2. **Resolution complete** → Update project documentation
3. **Learning captured** → Update VCMS framework
4. **Process improved** → Update workflow

### **In Template Creation**
1. **Common errors identified** → Add to troubleshooting guides
2. **Prevention strategies** → Add to setup checklists
3. **Resolution patterns** → Add to workflow documentation

### **In Project Handoff**
1. **Error history reviewed** → Update project documentation
2. **Common issues identified** → Update templates
3. **Process improvements** → Update framework

---

**Last Updated**: 2025-07-13  
**Document Owner**: VCMS Team 