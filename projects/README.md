# VCMS Projects

This folder contains all projects built using the Vibe Coding Model Spec (VCMS) framework.

## Structure

```
projects/
├── README.md (this file)
├── project-template/     # Template for new projects
└── [project-name]/       # Individual project folders
    ├── spec.md          # VCMS specification
    ├── src/             # Source code
    ├── docs/            # Project documentation
    └── README.md        # Project-specific README
```

## Workflow

1. **Create New Project**: Copy `project-template/` to a new folder
2. **Write Spec**: Use the VCMS framework to create a detailed specification
3. **Build**: Follow the spec precisely to implement the project
4. **Validate**: Use the enforcement tools to ensure spec compliance

## Accessing VCMS Framework

All projects have access to the VCMS framework files in the parent directory:
- `../Vibe_Coding_Model_Spec_v1.0.md` - Main framework specification
- `../tools/` - Configuration and validation tools
- `../enforcement/` - Validation scripts
- `../examples/` - Example implementations

## Project Naming Convention

Use descriptive, lowercase names with hyphens:
- `todo-app`
- `weather-dashboard`
- `chat-bot`
- `inventory-system` 