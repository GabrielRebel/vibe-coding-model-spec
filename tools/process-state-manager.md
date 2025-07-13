# VCMS Process State Manager

**Version**: 2.2.0  
**Created**: 2025-07-13  
**Last Updated**: 2025-07-13

## 🎯 **Purpose**

Enable LLMs and no-code tools to autonomously track progress through VCMS workflows, understand current state, and know what to do next without human intervention.

## 📊 **Process State Tracking**

### **Current State Structure**
```json
{
  "project": "taskmate",
  "phase": "development_environment_setup",
  "stage": "backend_validation",
  "status": "in_progress",
  "last_action": "frontend_started_successfully",
  "next_action": "test_backend_server",
  "blockers": [],
  "completed_steps": [
    "version_consistency_update",
    "frontend_dependencies_installed",
    "tsconfig_created",
    "frontend_server_running"
  ],
  "pending_steps": [
    "backend_server_start",
    "full_stack_validation",
    "error_documentation"
  ],
  "context": {
    "frontend_port": 3000,
    "backend_port": 5000,
    "frontend_status": "running",
    "backend_status": "unknown"
  }
}
```

### **Phase Definitions**
```yaml
phases:
  foundation_setup:
    stages: [template_creation, repository_setup, version_control]
    completion_criteria: "All templates created and committed"
    
  requirements_documentation:
    stages: [prd_creation, model_spec, validation_checklist]
    completion_criteria: "All documents completed and validated"
    
  development_environment_setup:
    stages: [frontend_setup, backend_setup, dependency_management]
    completion_criteria: "Both frontend and backend running successfully"
    
  development_handoff:
    stages: [environment_validation, error_resolution, documentation]
    completion_criteria: "No blocking errors, ready for feature development"
    
  build_iterate:
    stages: [atomic_components, testing, deployment]
    completion_criteria: "MVP deployed and functional"
```

## 🔄 **Autonomous Decision Making**

### **State Detection Rules**
```yaml
# When LLM encounters an error
if error_occurred:
  - classify_error_type()
  - check_troubleshooting_guide()
  - apply_error_resolution_protocol()
  - update_process_state()
  - determine_next_action()

# When step completes successfully
if step_completed:
  - mark_step_complete()
  - check_phase_completion()
  - determine_next_stage()
  - update_context()

# When blocker encountered
if blocker_found:
  - document_blocker()
  - check_resolution_paths()
  - request_human_intervention_if_needed()
  - update_process_state()
```

### **Next Action Determination**
```python
def determine_next_action(current_state):
    if current_state.phase == "development_environment_setup":
        if current_state.stage == "frontend_setup" and frontend_running():
            return "test_backend_server"
        elif current_state.stage == "backend_setup" and backend_running():
            return "validate_full_stack"
        elif error_occurred():
            return "resolve_error_using_protocol"
    
    return "continue_current_stage"
```

## 📋 **Context Window Management**

### **Essential Context for Each Phase**
```yaml
foundation_setup:
  required_files: ["README.md", "CHANGELOG.md", "templates/*"]
  current_focus: "template_quality"
  next_milestone: "requirements_documentation"
  
development_environment_setup:
  required_files: ["package.json", "tsconfig.json", "server.js"]
  current_focus: "error_resolution"
  next_milestone: "full_stack_validation"
  
error_resolution:
  required_files: ["troubleshooting.md", "error-resolution-protocol.md"]
  current_focus: "systematic_debugging"
  next_milestone: "error_documentation"
```

### **Context Compression Strategy**
```yaml
# Keep in context window:
- Current phase and stage
- Last 3 completed steps
- Current error (if any)
- Next 2 pending steps
- Essential configuration files

# Archive to long-term memory:
- Completed phases
- Resolved errors
- Historical decisions
- Detailed logs
```

## 🤖 **LLM Autonomous Actions**

### **When to Act Without Asking**
```yaml
autonomous_actions:
  - "Apply documented troubleshooting steps"
  - "Update process state after successful steps"
  - "Follow error resolution protocol"
  - "Document learnings in appropriate files"
  - "Move to next stage when criteria met"
  - "Update version numbers and dates"
  - "Create missing configuration files"
  - "Run validation tests"

human_intervention_required:
  - "New error types not in troubleshooting guide"
  - "Business logic decisions"
  - "Feature scope changes"
  - "Deployment decisions"
  - "Team coordination needs"
```

### **State Transition Examples**
```yaml
# Example 1: Frontend Error Resolved
from:
  stage: "frontend_setup"
  status: "error_resolution"
  error: "Missing tsconfig.json"
to:
  stage: "backend_setup"
  status: "in_progress"
  next_action: "test_backend_server"
  completed_steps: ["frontend_setup", "error_resolution"]

# Example 2: Backend Started Successfully
from:
  stage: "backend_setup"
  status: "in_progress"
  next_action: "test_backend_server"
to:
  stage: "full_stack_validation"
  status: "in_progress"
  next_action: "test_frontend_backend_communication"
  completed_steps: ["backend_setup"]
```

## 📝 **Implementation for Cursor/LLMs**

### **Context Injection Pattern**
```markdown
## Current Process State
**Project**: TaskMate
**Phase**: Development Environment Setup
**Stage**: Backend Validation
**Status**: In Progress
**Last Action**: Frontend server started successfully on port 3000
**Next Action**: Test backend server on port 5000
**Current Error**: None
**Blockers**: None

## Available Tools
- Error Resolution Protocol: tools/error-resolution-protocol.md
- Troubleshooting Guide: tools/troubleshooting.md
- Dependency Management: tools/dependency-management.md

## Next Steps
1. Navigate to backend directory
2. Check package.json for start script
3. Start backend server
4. Validate both servers are running
5. Test frontend-backend communication
```

### **Autonomous Decision Framework**
```yaml
decision_tree:
  if error_occurred:
    - classify_error()
    - check_troubleshooting_guide()
    - apply_resolution_protocol()
    - document_solution()
    - continue_process()
  
  if step_completed:
    - update_state()
    - check_completion_criteria()
    - determine_next_action()
    - execute_next_step()
  
  if blocker_found:
    - document_blocker()
    - check_resolution_paths()
    - request_help_if_needed()
```

## 🎯 **Current State for TaskMate**

Based on our progress, here's where we are:

```yaml
project: taskmate
phase: development_environment_setup
stage: backend_validation
status: in_progress
last_action: frontend_server_started_successfully
next_action: test_backend_server
context:
  frontend_port: 3000
  backend_port: 5000
  frontend_status: running
  backend_status: unknown
  current_directory: backend
  last_error: "Missing script: start" (resolved)
```

**Autonomous Next Action**: 
1. Check if backend package.json has start script
2. If missing, add "start": "node server.js"
3. Run npm start
4. Verify server starts on port 5000
5. Test frontend-backend communication

---

**This system allows LLMs to understand exactly where they are and what to do next without asking for direction.** 