#!/usr/bin/env python3
"""
Vibe Coding Model Spec Validator
Enforces directive-first development principles
"""

import re
import sys
import yaml
from pathlib import Path
from typing import List, Dict, Any

class SpecValidator:
    def __init__(self, spec_file: str):
        self.spec_file = Path(spec_file)
        self.errors = []
        self.warnings = []
        
    def validate_spec(self) -> bool:
        """Main validation function"""
        if not self.spec_file.exists():
            self.errors.append(f"Spec file not found: {self.spec_file}")
            return False
            
        content = self.spec_file.read_text()
        
        # Run all validations
        self._validate_required_sections(content)
        self._validate_spec_id(content)
        self._validate_scope_boundaries(content)
        self._validate_approval_workflow(content)
        self._validate_file_targets(content)
        
        return len(self.errors) == 0
    
    def _validate_required_sections(self, content: str):
        """Ensure all required sections are present"""
        required_sections = [
            "Problem Statement",
            "Success Metrics", 
            "Technical Architecture",
            "Out-of-Scope",
            "Timeline & Resources"
        ]
        
        for section in required_sections:
            if section not in content:
                self.errors.append(f"Missing required section: {section}")
    
    def _validate_spec_id(self, content: str):
        """Ensure spec has proper ID format"""
        spec_id_pattern = r'## SPEC-\w+-\d+:'
        if not re.search(spec_id_pattern, content):
            self.errors.append("Missing or invalid SPEC-ID format (e.g., SPEC-UI-001)")
    
    def _validate_scope_boundaries(self, content: str):
        """Ensure scope is clearly defined"""
        scope_indicators = [
            "Only modifies",
            "Changes limited to",
            "Affects only",
            "Targets specifically"
        ]
        
        has_scope = any(indicator in content for indicator in scope_indicators)
        if not has_scope:
            self.warnings.append("Scope boundaries not clearly defined")
    
    def _validate_approval_workflow(self, content: str):
        """Ensure approval workflow is specified"""
        approval_indicators = [
            "Approve?",
            "Reply 'GO!'",
            "Confirm Y/N",
            "User approval required"
        ]
        
        has_approval = any(indicator in content for indicator in approval_indicators)
        if not has_approval:
            self.errors.append("Missing approval workflow")
    
    def _validate_file_targets(self, content: str):
        """Ensure specific files are targeted"""
        file_patterns = [
            r'`[\w\-./]+\.(js|jsx|ts|tsx|css|html)`',
            r'src/[\w\-./]+',
            r'components/[\w\-./]+'
        ]
        
        has_file_targets = any(re.search(pattern, content) for pattern in file_patterns)
        if not has_file_targets:
            self.warnings.append("No specific files targeted - may lead to overreach")
    
    def print_results(self):
        """Print validation results"""
        if self.errors:
            print("❌ SPEC VALIDATION FAILED:")
            for error in self.errors:
                print(f"  - {error}")
            return False
        
        if self.warnings:
            print("⚠️  SPEC VALIDATION WARNINGS:")
            for warning in self.warnings:
                print(f"  - {warning}")
        
        print("✅ SPEC VALIDATION PASSED")
        return True

def main():
    """Main entry point"""
    if len(sys.argv) != 2:
        print("Usage: python validate-spec.py <spec-file.md>")
        sys.exit(1)
    
    spec_file = sys.argv[1]
    validator = SpecValidator(spec_file)
    
    if validator.validate_spec():
        if validator.print_results():
            sys.exit(0)
        else:
            sys.exit(1)
    else:
        validator.print_results()
        sys.exit(1)

if __name__ == "__main__":
    main() 