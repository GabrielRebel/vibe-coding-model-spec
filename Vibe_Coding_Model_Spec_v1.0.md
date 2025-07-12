# 🧠 Vibe Coding Model Spec v2.0: "Directive-First Development"

*Inspired by Sean Grove's "New Code" philosophy and Luke Bechtel's "Vibe Specs"*

> **Senior Developer's Note**: After 50 years of building systems for Fortune 500 companies, I've learned that the difference between a successful project and a failed one often lies in the precision of our specifications and the discipline of our execution. This enhanced spec incorporates battle-tested patterns that have delivered billions in value across industries.

## 1. Core Principles

### Atomic Actions
AI must modify only referenced components (e.g., "Change this button to yellow" ≠ "Change all buttons").

**Senior Dev Enhancement**: 
- Use file-level granularity: "Modify `src/components/Button.jsx` line 23-45 only"
- Implement change tracking: `git diff --name-only` before and after
- Require explicit scope boundaries: "This change affects: [list of files]"

### Minimal Scope Expansion
Never add features/dependencies without explicit user approval (e.g., "Adding React Router for navigation? Confirm Y/N").

**Senior Dev Enhancement**:
- Dependency impact analysis: "Adding React Router will affect 3 files, add 156KB to bundle, require 2 new API endpoints"
- Cost-benefit breakdown: "Feature X saves 2 hours/week but adds 3 days of development"
- Risk assessment: "This library has 47 open issues, last updated 6 months ago"

### Context Guardrails
Use isolated sessions per task to prevent "context drift".

**Senior Dev Enhancement**:
- Session boundaries: Each task gets a unique session ID
- Context snapshots: Save state at decision points
- Memory management: Clear context after 3 related tasks

### 🆕 Precision Engineering
**Senior Dev Addition**:
- **Single Responsibility**: Each component/module has one clear purpose
- **Interface Contracts**: Define exact input/output specifications
- **Error Boundaries**: Explicit error handling for each component
- **Performance Budgets**: Set and enforce performance constraints

```mermaid
graph LR  
  A[Spec Phase] --> B[Core MVP] --> C[User-Approved Extensions]  
  B --> D[Performance Validation]
  C --> E[Integration Testing]
  D --> F[Production Ready]
  E --> F
```

## 2. Workflow Rules

### Phase 0: Spec Drafting (Mandatory)

**Step 1**: AI always starts by proposing a spec in Markdown (`.cursor/scopes/Feature.md`). Must include:

- **User Problem**: "Why is this needed?"
- **Success Metrics**: "We succeed if X works without breaking Y."
- **Out-of-Scope**: "This will NOT modify legacy components A/B"

**Senior Dev Enhancement - Comprehensive Spec Template**:
```markdown
## SPEC-[ID]: [Feature Name]

### 🎯 Problem Statement
- **User Need**: [Specific user pain point]
- **Business Impact**: [Quantified value - e.g., "Reduces support tickets by 40%"]
- **Current State**: [What exists now]
- **Desired State**: [What we want]

### 📊 Success Metrics
- **Primary**: [Main success indicator with target]
- **Secondary**: [Supporting metrics]
- **Acceptance Criteria**: [Specific, testable requirements]

### 🏗️ Technical Architecture
- **Components**: [List of files/components to modify]
- **Dependencies**: [New libraries/packages needed]
- **API Changes**: [Backend modifications required]
- **Database Changes**: [Schema modifications]

### 🚫 Out-of-Scope
- **Explicitly Excluded**: [What we won't touch]
- **Future Considerations**: [What might come later]
- **Breaking Changes**: [What might break]

### ⏱️ Timeline & Resources
- **Estimated Effort**: [Hours/days]
- **Critical Path**: [Dependencies and blockers]
- **Risk Factors**: [Potential issues]
```

**Step 2**: User reviews/edits spec → AI waits for "GO!" before coding.

**Senior Dev Enhancement**:
- **Spec Validation**: AI must confirm all sections are complete
- **Stakeholder Review**: Identify who needs to approve (dev, PM, QA)
- **Resource Check**: Verify required tools/libraries are available

### Phase 1: Code Generation

**Rule 1**: Code must reference spec IDs (e.g., `// Implements SPEC-UI-03: Yellow Button`).

**Senior Dev Enhancement**:
- **Traceability**: Every function/component links to spec requirement
- **Version Control**: Include spec version in comments
- **Change Log**: Document what was implemented vs. original spec

**Rule 2**: For ambiguous tasks, AI must ask:
> "Should I refactor Navbar.js to add this, or create a new component?"

**Senior Dev Enhancement**:
- **Impact Analysis**: "Refactoring affects 12 files, new component affects 3 files"
- **Performance Comparison**: "Refactor: +2KB bundle, New component: +8KB bundle"
- **Maintenance Trade-offs**: "Refactor: higher coupling, New component: better separation"

**Rule 3**: No silent upgrades (e.g., if adding a library, log: `npm install lodash? [Y/N]`).

**Senior Dev Enhancement**:
- **Security Scan**: Check for known vulnerabilities before suggesting
- **License Review**: Verify license compatibility with project
- **Bundle Analysis**: Show impact on application size and load time

### 🆕 Code Quality Standards
**Senior Dev Addition**:
- **Type Safety**: Use TypeScript interfaces for all data structures
- **Error Handling**: Implement comprehensive error boundaries
- **Performance**: Include performance budgets and monitoring
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Testing**: Minimum 80% code coverage for new features

### Phase 2: Error Handling & Iteration

**Errors**: AI must:
- Isolate the bug's location (file/line).
- Propose one fix (no shotgun debugging).
- Wait for approval before modifying unrelated code.

**Senior Dev Enhancement**:
- **Root Cause Analysis**: "Error occurs because [specific reason], not just [symptom]"
- **Impact Assessment**: "This bug affects [X] users, [Y] transactions per day"
- **Fix Validation**: "Proposed fix tested in [environment], expected outcome: [result]"
- **Regression Testing**: "This change won't affect [list of related features]"

**Iterations**: Users trigger upgrades via:
> *"Add pagination to SPEC-DATA-02. Leave other tables unchanged."*

**Senior Dev Enhancement**:
- **Change Isolation**: "Pagination affects only `DataTable.js` and `Pagination.js`"
- **Performance Impact**: "Pagination adds 15ms to initial load, reduces memory by 40%"
- **User Experience**: "Pagination improves load time from 3s to 0.5s for large datasets"

### 🆕 Debugging Protocol
**Senior Dev Addition**:
- **Error Classification**: Categorize as UI, Logic, Performance, or Security
- **Reproduction Steps**: Provide exact steps to reproduce the issue
- **Environment Context**: Document browser, OS, and data state
- **Fix Verification**: Demonstrate the fix resolves the issue

## 3. Tool-Specific Guardrails

| Tool | Rule | Purpose |
|------|------|---------|
| Cursor | Always load `.cursor/scopes/active_spec.md` as context | Prevents scope creep |
| Lovable.dev | Freeze non-targeted UI layers during edits | Avoids redesigning entire screens |
| Stagehand | Require CSS selectors/IDs for element targeting (e.g., `#submit-btn`) | Ensures surgical changes |

### 🆕 Senior Dev Tool Enhancements

#### IDE & Editor Integration
- **VS Code**: Use workspace-specific settings and extensions
- **IntelliJ**: Leverage project-specific run configurations
- **Vim/Emacs**: Maintain project-specific keybindings and macros

#### Version Control Best Practices
- **Git Flow**: Feature branches from `develop`, hotfixes from `main`
- **Commit Standards**: Conventional commits with scope (e.g., `feat(ui): add yellow button`)
- **Branch Protection**: Require code review and CI passing before merge

#### CI/CD Pipeline Integration
- **Automated Testing**: Run tests on every commit
- **Code Quality**: ESLint, Prettier, and SonarQube checks
- **Security Scanning**: OWASP ZAP and dependency vulnerability checks
- **Performance Monitoring**: Lighthouse CI and bundle analysis

#### Database & API Tools
- **Database Migrations**: Version-controlled schema changes
- **API Documentation**: OpenAPI/Swagger specs for all endpoints
- **Mock Services**: WireMock or MSW for development and testing

## 4. Anti-"Overreach" Protocols

### Change Isolation
AI must generate:
```diff
- // BAD: Modifies entire theme  
+ // GOOD: Only targets #settings-modal .btn-primary  
```

**Senior Dev Enhancement**:
- **File-level Isolation**: "Changes limited to `src/components/Settings/Modal.jsx`"
- **Function-level Precision**: "Only `handleSubmit()` function modified"
- **CSS Scope Control**: "Styles scoped to `.settings-modal` class only"

### Dependency Audit
AI logs all new packages/files with:
> *"Added date-fns. Required for SPEC-DATE-01. No other files touched."*

**Senior Dev Enhancement**:
- **Security Impact**: "date-fns has no known vulnerabilities, MIT license"
- **Bundle Impact**: "Adds 12KB to bundle size, tree-shakeable"
- **Maintenance Impact**: "Weekly updates, 2.5M weekly downloads"

### Rollback Triggers
If >2 unrelated files change, auto-revert and alert user.

**Senior Dev Enhancement**:
- **Change Thresholds**: Alert at 3+ files, auto-revert at 5+ files
- **Impact Scoring**: Weight changes by file importance (core vs. utility)
- **Rollback Strategy**: Maintain backup of original state before changes

### 🆕 Change Management Protocol
**Senior Dev Addition**:
- **Pre-change Snapshot**: Git stash or branch before modifications
- **Change Logging**: Document every file modification with reason
- **Impact Assessment**: Calculate risk score based on change scope
- **Approval Workflow**: Require explicit approval for high-impact changes

## 5. MVP Development Checklist

AI must confirm before proceeding:

### Phase 1 (Core):
- [ ] Basic functionality works (no edge cases).
- [ ] Zero dependencies on future phases.
- [ ] User manually tested critical path.

**Senior Dev Enhancement**:
- [ ] **Performance Baseline**: Core Web Vitals meet targets (LCP < 2.5s, FID < 100ms)
- [ ] **Security Scan**: No critical vulnerabilities in dependencies
- [ ] **Accessibility**: WCAG 2.1 AA compliance verified
- [ ] **Cross-browser**: Tested on Chrome, Firefox, Safari, Edge
- [ ] **Mobile Responsive**: Works on iOS and Android devices

### Phase 2 (Extensions):
- [ ] Spec amendment filed (`scopes/phase2.md`).
- [ ] Budgeted token cost shared (e.g., "Adding auth: ~2,000 tokens").

**Senior Dev Enhancement**:
- [ ] **Integration Testing**: All API endpoints tested with real data
- [ ] **Error Handling**: Graceful degradation for all failure scenarios
- [ ] **Monitoring Setup**: Logging and metrics collection configured
- [ ] **Documentation**: User guides and API documentation updated

### 🆕 Production Readiness Checklist
**Senior Dev Addition**:
- [ ] **Load Testing**: System handles expected user load (1000+ concurrent users)
- [ ] **Backup Strategy**: Data backup and recovery procedures in place
- [ ] **Deployment Plan**: Blue-green or canary deployment strategy
- [ ] **Rollback Plan**: Quick rollback procedure documented and tested
- [ ] **Monitoring Alerts**: Critical error and performance alerts configured

## 6. Testing & Quality Enforcement

- **Tests**: AI generates unit tests for new code only (e.g., `test/Button.test.js` for yellow button).
- **Security Scan**: Run `npm audit`/`snyk` post-generation and flag vulnerabilities.
- **Perf Budget**: Fail builds if MVP Lighthouse score <70.

### 🆕 Senior Dev Testing Strategy

#### Unit Testing Standards
- **Coverage Target**: Minimum 80% code coverage for new features
- **Test Types**: Unit, integration, and end-to-end tests
- **Mock Strategy**: Mock external dependencies, not internal logic
- **Test Data**: Use factories/fixtures for consistent test data

#### Security Testing Protocol
- **Dependency Scanning**: Weekly automated vulnerability scans
- **Code Analysis**: Static analysis with SonarQube or similar
- **Penetration Testing**: Quarterly security assessments
- **Secret Management**: No hardcoded secrets in code

#### Performance Testing Framework
- **Load Testing**: Simulate expected user load patterns
- **Stress Testing**: Test system limits and failure points
- **Performance Budgets**: Set limits for bundle size, load times, memory usage
- **Monitoring**: Real-time performance metrics collection

#### Quality Gates
- **Code Review**: All changes require peer review
- **Automated Checks**: Linting, formatting, and type checking
- **Manual Testing**: User acceptance testing for critical features
- **Documentation**: Code comments and API documentation updated

## 🔧 Implementation in Cursor (Example)

### Install "Directive-First" Rules
Paste Bechtel's spec workflow into Cursor settings.

### Start a Task:
```
/task add-settings-modal  
```

**AI Responds:**
```markdown
## PROPOSED SPEC: Settings Modal  
**Problem**: Users need profile edits.  
**MVP**: Form with name/email fields.  
**Out-of-Scope**: Not linked to backend yet.  
**Changes**: Only modifies `Settings.js`.  
Approve? (Reply "GO!")  
```

User says "GO!" → AI builds only the modal.

### 🆕 Senior Dev Implementation Examples

#### Example 1: E-commerce Checkout Enhancement
```
/task improve-checkout-flow
```

**AI Response:**
```markdown
## SPEC-CHECKOUT-001: Streamlined Checkout Process

### 🎯 Problem Statement
- **User Need**: Reduce cart abandonment (currently 68%)
- **Business Impact**: 15% increase in conversion rate = $2.4M annually
- **Current State**: 5-step checkout with 3 required fields per step
- **Desired State**: 3-step checkout with smart field validation

### 📊 Success Metrics
- **Primary**: Reduce checkout time from 4.2min to 2.1min
- **Secondary**: Decrease cart abandonment to <45%
- **Acceptance Criteria**: 
  - One-click address autocomplete
  - Real-time payment validation
  - Mobile-optimized form layout

### 🏗️ Technical Architecture
- **Components**: `CheckoutForm.jsx`, `AddressAutocomplete.jsx`, `PaymentValidator.jsx`
- **Dependencies**: `@googlemaps/js-api-loader`, `stripe-js`
- **API Changes**: New `/api/validate-address` endpoint
- **Database Changes**: Add `address_verification` table

### 🚫 Out-of-Scope
- **Explicitly Excluded**: Payment processing backend, user authentication
- **Future Considerations**: Multi-currency support, saved payment methods
- **Breaking Changes**: None - backward compatible

### ⏱️ Timeline & Resources
- **Estimated Effort**: 3 developer days
- **Critical Path**: Google Maps API integration, Stripe validation
- **Risk Factors**: API rate limits, payment gateway downtime

**Approve? (Reply "GO!")**
```

#### Example 2: Performance Optimization
```
/task optimize-dashboard-performance
```

**AI Response:**
```markdown
## SPEC-PERF-002: Dashboard Performance Optimization

### 🎯 Problem Statement
- **User Need**: Dashboard loads in 8.2s, users abandon after 3s
- **Business Impact**: 23% of users never see key metrics
- **Current State**: Single large API call loads all dashboard data
- **Desired State**: Progressive loading with skeleton screens

### 📊 Success Metrics
- **Primary**: Initial load time <2s, interactive <3s
- **Secondary**: 95th percentile load time <4s
- **Acceptance Criteria**: Lighthouse Performance score >90

### 🏗️ Technical Architecture
- **Components**: `Dashboard.jsx`, `DataLoader.jsx`, `SkeletonLoader.jsx`
- **Dependencies**: `react-query`, `react-window` (virtualization)
- **API Changes**: Split `/api/dashboard` into `/api/metrics`, `/api/charts`, `/api/alerts`
- **Database Changes**: Add indexes on `created_at` and `user_id` columns

### 🚫 Out-of-Scope
- **Explicitly Excluded**: Real-time updates, export functionality
- **Future Considerations**: WebSocket integration, offline support
- **Breaking Changes**: None - API maintains backward compatibility

### ⏱️ Timeline & Resources
- **Estimated Effort**: 2 developer days
- **Critical Path**: API endpoint splitting, frontend state management
- **Risk Factors**: Data consistency during progressive loading

**Approve? (Reply "GO!")**
```

## 🚨 Why This Spec Solves Your Pain Points

- **No Surprise Changes**: Atomic actions + spec IDs prevent "yellow button chaos".
- **Budget Control**: Phased MVPs avoid 500-file monstrosities.
- **Debuggability**: Isolated errors + rollbacks keep tech debt near zero.
- **Tool-Agnostic**: Works with Cursor, Lovable, Stagehand, or raw ChatGPT.

### 🆕 Senior Dev Value Propositions

#### Enterprise-Grade Reliability
- **Predictable Delivery**: Spec-driven development eliminates scope creep
- **Risk Mitigation**: Early identification of technical and business risks
- **Quality Assurance**: Built-in testing and validation at every phase
- **Compliance Ready**: Audit trails and documentation for regulatory requirements

#### Scalable Development Process
- **Team Collaboration**: Clear specifications enable parallel development
- **Knowledge Transfer**: Comprehensive documentation reduces onboarding time
- **Maintenance Efficiency**: Traceable code changes simplify debugging
- **Performance Optimization**: Built-in performance budgets prevent degradation

#### Cost-Effective Development
- **Reduced Rework**: Clear specifications minimize misunderstandings
- **Faster Iteration**: Isolated changes enable rapid testing and deployment
- **Resource Optimization**: Precise effort estimation prevents over-allocation
- **Technical Debt Prevention**: Quality gates maintain codebase health

## 📥 Next Steps

1. **Test Drive**: Apply Luke Bechtel's Cursor rules to your next project.
2. **Extend**: Add your own clauses (e.g., "Never use `!important` in CSS").
3. **Automate**: Use MCP to pipe specs → Stagehand → Browserbase for hands-off deployment.

### 🆕 Senior Dev Implementation Roadmap

#### Phase 1: Foundation (Week 1-2)
- [ ] Set up project structure with `.cursor/scopes/` directory
- [ ] Configure IDE extensions for spec validation
- [ ] Establish Git workflow with conventional commits
- [ ] Create initial project templates and boilerplates

#### Phase 2: Integration (Week 3-4)
- [ ] Integrate CI/CD pipeline with quality gates
- [ ] Set up automated testing and security scanning
- [ ] Configure performance monitoring and alerting
- [ ] Establish code review and approval workflows

#### Phase 3: Optimization (Week 5-6)
- [ ] Refine spec templates based on project feedback
- [ ] Optimize development workflow and tooling
- [ ] Implement advanced monitoring and analytics
- [ ] Create team training and documentation

#### Phase 4: Scale (Week 7+)
- [ ] Extend to multiple projects and teams
- [ ] Develop custom tooling and automation
- [ ] Establish best practices and standards
- [ ] Create reusable component libraries

### 🆕 Advanced Features for Enterprise

#### AI-Powered Spec Generation
- **Template Library**: Industry-specific spec templates
- **Auto-Completion**: AI suggests spec sections based on project context
- **Validation Engine**: Automated spec completeness checking
- **Impact Analysis**: AI predicts change impact before implementation

#### Integration Ecosystem
- **Project Management**: Jira, Asana, and Linear integration
- **Design Tools**: Figma and Sketch spec synchronization
- **Documentation**: Automated API and user documentation generation
- **Monitoring**: Real-time performance and error tracking

#### Compliance and Governance
- **Audit Trails**: Complete change history and approval tracking
- **Security Scanning**: Automated vulnerability and compliance checks
- **Performance SLAs**: Enforced performance budgets and monitoring
- **Access Control**: Role-based permissions for spec modification

---

> *"A spec isn't paperwork—it's bulletproofing. It turns 'vibes' into version-controlled intent."*
> — Adapted from Sean Grove, OpenAI

> **Senior Developer's Reflection**: After 50 years of building systems, I've learned that the difference between successful and failed projects isn't just about code quality—it's about the precision of our intent and the discipline of our execution. This enhanced spec framework transforms vague requirements into executable, measurable, and maintainable solutions.

This spec forces AI to be your precision scalpel, not a wrecking ball. 