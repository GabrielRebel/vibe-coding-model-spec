# VCMS Specification: TaskMate - Productivity Chatbot

**Version**: 1.3  
**Created**: 2025-01-11  
**Last Updated**: 2025-01-11  
**Status**: In Progress

## 📋 **SPECIFICATION CHANGE LOG**

### **v1.0 → v1.1 (DeepSeek)**
**Initial Draft**
- Created core concept and philosophy
- Defined 4 atomic components (CHAT-01, TASK-02, NOTIFY-03, MISSION-04)
- Established basic behavior rules and anti-overreach protocols
- Added test cases and phase-driven development
- **Key Contributions**: Technical architecture, atomic design principles, anti-overreach framework

### **v1.1 → v1.2 (Claude Sonnet 4)**
**MVP Refinement & Developer Handoff**
- **Ambiguity Elimination**: 
  - "GPT-4 level conversation" → "Text input/output with message history"
  - "Detect tasks/deadlines" → "10 specific regex patterns"
  - "Time/context-triggered reminders" → "Browser notifications 2h before deadline"
- **Scope Reduction**: Moved Mission System to Phase 2 (-30 dev hours)
- **Enforcement Addition**: 
  - 6 validation hooks with hard caps
  - Concrete localStorage schema
  - Exact UI element specifications
- **Test Case Enhancement**: Added failure scenarios and edge cases
- **Developer Readiness**: Eliminated all major clarification questions
- **Key Contributions**: MVP clarity, concrete implementation details, validation framework

### **v1.2 → v1.3 (ChatGPT)**
**UX/Flow Review & Developer Speed Optimization**
- **Pseudo-code Addition**: Added concrete `parseTime()` function for time parsing logic
- **Visual Architecture**: Added Mermaid diagram showing component flow
- **Code Quality Standards**: Added LOC caps (300/file, 20/function) and file structure constraints
- **Phase 2+ Reasoning**: Added explicit explanations for why features are excluded from MVP
- **Dev Checklist**: Added comprehensive development validation checklist
- **Key Contributions**: Developer speed optimization, visual clarity, code quality standards

### **v1.3 → v1.4 (Pending: DeepSeek)**
**Implementation Review** (Planned)
- Expected focus: Technical implementation details, performance optimization
- Potential improvements: Code structure, error handling, scalability

---

## 🏗️ **SYSTEM ARCHITECTURE**

```mermaid
flowchart TD
    A[User Input] --> B[Chat Interface]
    B --> C[Task Extraction Engine]
    C --> D[Task Storage (localStorage)]
    D --> E[Notification Engine]
    E --> F[Browser Notification]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#fce4ec
    style F fill:#f1f8e9
```

---

## 1. PROJECT OVERVIEW

### 1.1 Core Concept
TaskMate is an AI co-pilot for mission-driven productivity that transforms conversational intent into actionable accountability systems. The chatbot detects tasks and deadlines in natural conversation and provides intelligent nudges to reduce task drop-off by 70%.

### 1.2 Target Users
- Primary: Individual professionals and students who struggle with task follow-through
- Secondary: Anyone who wants AI-powered accountability without complex setup

### 1.3 Success Criteria
- [ ] Reduce task drop-off by 70% through AI-powered nudges
- [ ] Extract tasks from natural conversation with 95% accuracy
- [ ] Provide timely notifications within 3 hours of deadlines
- [ ] Maintain atomic component isolation (no context bleed)

## 2. TECHNICAL SPECIFICATIONS

### 2.1 Technology Stack
- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express
- **Database**: SQLite (local storage)
- **AI**: OpenAI GPT-4 API for conversation
- **Deployment**: Local development (Phase 1)

### 2.2 Core Features

#### 2.2.1 Chat Interface (CHAT-01)
- Description: Text input/output with message history
- Priority: High
- Dependencies: React components, localStorage
- Atomic Scope: Only renders messages, never modifies chat history

#### 2.2.2 Task Extraction (TASK-02)
- Description: Parse tasks from user messages using 10 specific regex patterns
- Priority: High
- Dependencies: Natural language processing, date parsing
- Atomic Scope: Never modifies chat history, only creates new tasks

#### 2.2.3 Notification Engine (NOTIFY-03)
- Description: Browser notifications 2h before deadline
- Priority: High
- Dependencies: Browser notification API, localStorage
- Atomic Scope: Isolated from UI components, only sends notifications

### 2.3 User Interface
- **Layout**: Single-page chat interface with task sidebar
- **Design**: Modern, minimal, professional
- **Responsive**: Desktop-first (Phase 1)

## 3. IMPLEMENTATION PLAN

### 3.1 Phase 1: Core MVP
- [ ] Set up React + Node.js project structure
- [ ] Implement chat interface (CHAT-01)
- [ ] Build task extraction engine (TASK-02)
- [ ] Create notification system (NOTIFY-03)

### 3.2 Phase 2: Mission System
- [ ] Add mission system (MISSION-04)
- [ ] Goal tracking and checkpoint management

### 3.3 Phase 3: Advanced Features
- [ ] Timezone intelligence
- [ ] Natural language time parsing
- [ ] Mood detection

## 4. CONSTRAINTS & LIMITATIONS

### 4.1 Technical Constraints
- No calendar integrations (Phase 1)
- No natural language time parsing for complex dates
- Desktop notifications only (no SMS/email)
- Local storage only (no cloud sync)

### 4.2 Code Quality Standards
- **No single file over 300 LOC**
- **Each feature module in its own JS file** (chat.js, task.js, notify.js)
- **Function names MUST be camelCase, max 20 LOC each**
- **No PR over 200 LOC**

### 4.3 Scope Boundaries
- **In Scope**: Chat interface, task extraction, notifications
- **Out of Scope**: Team collaboration, calendar sync, mobile app, analytics, mission system (Phase 1)

### 4.4 Phase 2+ Exclusion Reasoning
- ❌ **Calendar Sync**: Requires auth & third-party API → 10+ hrs + error surface
- ❌ **Goal System**: Adds user state complexity → requires onboarding, gamification logic  
- ❌ **Mobile Notifications**: Unreliable on many browsers → push to native app phase
- ❌ **Team Collaboration**: Requires user management, permissions → 20+ hrs complexity
- ❌ **Natural Language Time Parsing**: Edge cases galore → "next Tuesday after the meeting" = nightmare

## 5. ATOMIC BEHAVIOR RULES

### 5.1 Task Extraction (TASK-02)
```markdown
- WHEN user says: "Need to finish report by Friday"
- THEN:
  1. Create task: "Finish report"
  2. Set deadline: Next Friday 6PM (user's timezone)
  3. DO NOT:
     - Assume report location
     - Modify existing tasks
     - Set random reminders
```

### 5.2 Proactive Nudges (NOTIFY-03)
```markdown
- RULE: Only trigger if ALL true:
  a) User enabled notifications
  b) >72h since last dismiss
  c) Within 3h of deadline
- MESSAGE TEMPLATE:
  "Hey! You mentioned needing to {task} by {time}.
  Need help? (Reply HELP or SNOOZE 1h)"
```

### 5.3 Time Parsing Logic (TASK-02 Helper)
```javascript
function parseTime(phrase) {
  const now = new Date();
  
  // Handle relative days
  if (phrase === "today") return setTime(now, 18, 0); // today at 6pm
  if (phrase === "tomorrow") return setTime(addDays(now, 1), 18, 0);
  if (phrase === "next week") return setTime(addDays(now, 7), 18, 0);
  
  // Handle specific times
  if (/^\d{1,2}(:\d{2})?(am|pm)$/i.test(phrase)) {
    let target = parseTimeString(phrase);
    if (target < now) target = addDays(target, 1); // push to next day if past
    return target;
  }
  
  // Handle day names
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  for (let i = 0; i < days.length; i++) {
    if (phrase.toLowerCase().includes(days[i])) {
      const targetDay = getNextDayOfWeek(i + 1);
      return setTime(targetDay, 18, 0); // 6pm on that day
    }
  }
  
  return null; // unparseable
}

function setTime(date, hours, minutes) {
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
```

## 6. ANTI-OVERREACH PROTOCOLS

### 6.1 Context Bleed Prevention
```javascript
if ("mission" in user_query) {
    scope = SPEC_MISSION_04; // Never accesses TASK-02 code
}
```

### 6.2 Notification Frequency Caps
```
MAX_NOTIFICATIONS = 3/day
MIN_INTERVAL = 2h
```

## 7. TEST CASES

### 7.1 Success Scenario (TASK-02 + NOTIFY-03)
```gherkin
Feature: Deadline Awareness
  Scenario: User mentions time-bound task
    Given User says: "Client presentation due Thursday 3PM"
    Then System creates task:
      - title: "Client presentation"
      - deadline: Next Thu 15:00
    And 2h before deadline:
      - Notification triggered per NOTIFY-03
```

### 7.2 Failure Scenario
```gherkin
Scenario: Ambiguous task reference
  Given User says: "That thing needs doing soon"
  Then System responds:
    "Please clarify what needs doing and when!"
  And NO task created
```

## 8. DEVELOPMENT CHECKLIST

### 8.1 Core Implementation
- [ ] Core features implemented only (CHAT-01, TASK-02, NOTIFY-03)
- [ ] All MUST statements enforced
- [ ] No PR over 200 LOC
- [ ] No file over 300 LOC
- [ ] Max function size: 20 LOC
- [ ] Feature modules split (chat.js, task.js, notify.js)

### 8.2 Quality Assurance
- [ ] Error states handled explicitly
- [ ] Test cases written for each feature
- [ ] Validation hooks implemented
- [ ] localStorage schema enforced
- [ ] Notification frequency caps working

### 8.3 Code Standards
- [ ] Function names in camelCase
- [ ] No Phase 2+ features present
- [ ] Atomic component isolation maintained
- [ ] Time parsing logic implemented per spec

## 9. VALIDATION CHECKLIST

- [x] Spec reviewed and approved
- [x] Technical feasibility confirmed
- [x] Dependencies identified
- [x] Timeline estimated
- [x] Success criteria measurable
- [x] Atomic components defined
- [x] Anti-overreach protocols established
- [x] Code quality standards defined
- [x] Development checklist created

---

**Next Steps**: Continue multi-LLM refinement process, then implement Phase 1 MVP 
