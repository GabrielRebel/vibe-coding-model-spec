# VCMS Documentation Standards

**Version**: 2.2.0  
**Created**: July 13, 2025  
**Purpose**: Ensure consistent, organized documentation across all VCMS projects

---

## 📋 **Documentation Organization**

### **Project-Level Documentation** (Project Folder)
**Location**: `projects/[project-name]/docs/`

**Required Files**:
- `PRD.md` - Product Requirements Document
- `Model-Spec.md` - Technical specification
- `Validation-Checklist.md` - Pre-build validation
- `Change-Log.md` - Session progress and changes
- `Session-Summary-YYYY-MM-DD-[Focus].md` - Individual session summaries
- `Project-Progress.md` - Overall project milestones and status

**Optional Files**:
- `Setup-Guide.md` - Environment setup instructions
- `Troubleshooting.md` - Common issues and solutions
- `API-Documentation.md` - Technical API reference

### **Framework-Level Documentation** (VCMS Root)
**Location**: `vibeCoding/`

**Core Files**:
- `README.md` - Framework overview
- `Vibe-Coding-Workflow.md` - Main workflow process
- `Vibe_Coding_Model_Spec_v1.0.md` - Framework specification
- `CHANGELOG.md` - Framework version history
- `Documentation-Standards.md` - This file

**Templates**:
- `templates/` - Reusable documentation templates
- `tools/` - Framework tools and configurations
- `examples/` - Example implementations

---

## 📝 **Documentation Standards**

### **File Naming Conventions**
- **Session Summaries**: `Session-Summary-YYYY-MM-DD-[Focus].md`
- **Project Files**: `Project-Progress.md`, `Setup-Guide.md`
- **Templates**: `[Type]-Template.md`
- **Configuration**: `[tool]-config.[ext]`

### **Content Structure**
1. **Header**: Project name, version, date, status
2. **Table of Contents**: For documents > 500 words
3. **Executive Summary**: Key points and status
4. **Detailed Sections**: Organized with clear headings
5. **Action Items**: Next steps and priorities
6. **References**: Links to related documents

### **Writing Style**
- **Clear and Concise**: Avoid unnecessary jargon
- **Action-Oriented**: Use active voice and imperative mood
- **Consistent Formatting**: Use markdown standards
- **Visual Hierarchy**: Use headers, lists, and emphasis appropriately

---

## 🔄 **Documentation Workflow**

### **During Development Sessions**
1. **Session Start**: Review previous session summary
2. **Progress Tracking**: Update Change Log with key decisions
3. **Issue Documentation**: Record problems and solutions
4. **Learning Capture**: Document new patterns and insights

### **Session End**
1. **Create Session Summary**: Use template, fill in all sections
2. **Update Project Progress**: Add milestones and achievements
3. **Update Framework**: Document process improvements
4. **Plan Next Session**: Define priorities and action items

### **Documentation Review**
1. **Consistency Check**: Ensure all files follow standards
2. **Completeness Check**: Verify all sections are filled
3. **Link Verification**: Check internal references
4. **Version Control**: Commit changes with descriptive messages

---

## 📊 **Documentation Quality Metrics**

### **Completeness**
- [ ] All required files present
- [ ] All sections filled out
- [ ] No placeholder text remaining
- [ ] Links and references working

### **Consistency**
- [ ] File naming follows conventions
- [ ] Content structure standardized
- [ ] Writing style consistent
- [ ] Formatting uniform

### **Usefulness**
- [ ] Information is actionable
- [ ] Context is preserved
- [ ] Decisions are documented
- [ ] Learnings are captured

### **Maintainability**
- [ ] Easy to find information
- [ ] Easy to update content
- [ ] Version history tracked
- [ ] Dependencies documented

---

## 🎯 **Documentation Priorities**

### **High Priority**
- Session summaries (immediate value)
- Error fixes and solutions (prevent repetition)
- Technical decisions (context preservation)
- Process improvements (framework enhancement)

### **Medium Priority**
- Setup guides (ease onboarding)
- API documentation (technical reference)
- Performance metrics (progress tracking)
- User feedback (improvement insights)

### **Low Priority**
- Detailed technical specifications (when stable)
- Historical documentation (for reference)
- Marketing materials (when ready)
- Community guidelines (when needed)

---

## 🔧 **Documentation Tools**

### **Required Tools**
- **Markdown Editor**: VS Code, Cursor, or similar
- **Version Control**: Git with descriptive commits
- **Template System**: Standardized templates for consistency
- **Link Checker**: Verify internal references

### **Recommended Tools**
- **Diagram Tools**: Mermaid for flowcharts
- **Screenshot Tools**: For UI documentation
- **API Testing**: Postman or similar for API docs
- **Code Documentation**: JSDoc, TypeDoc for technical docs

---

## 📋 **Documentation Checklist**

### **Before Committing**
- [ ] All required sections completed
- [ ] No placeholder text remaining
- [ ] Links and references verified
- [ ] File naming follows conventions
- [ ] Content structure standardized
- [ ] Writing style consistent
- [ ] Version numbers updated
- [ ] Dates and timestamps accurate

### **Before Session End**
- [ ] Session summary created
- [ ] Progress tracked in Change Log
- [ ] Issues documented with solutions
- [ ] Next session priorities defined
- [ ] Framework improvements noted
- [ ] All changes committed to version control

---

## 🚀 **Continuous Improvement**

### **Documentation Reviews**
- **Weekly**: Review session summaries for completeness
- **Monthly**: Assess documentation quality and usefulness
- **Quarterly**: Update templates and standards
- **Annually**: Major framework documentation overhaul

### **Feedback Loop**
- **User Feedback**: Collect input on documentation usefulness
- **Process Improvement**: Refine documentation workflow
- **Template Updates**: Enhance templates based on usage
- **Standard Evolution**: Update standards as framework grows

---

**Documentation Status**: **ACTIVE**  
**Last Updated**: July 13, 2025  
**Next Review**: July 20, 2025  
**Maintainer**: VCMS Team 