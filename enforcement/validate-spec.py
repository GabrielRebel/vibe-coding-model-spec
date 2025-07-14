#!/usr/bin/env python3
import sys
import re
import os

REQUIRED_SECTIONS = [
    'Problem',
    'Goals',
    'Out-of-Scope',
    'Approval',
    'Targeted Files'
]

SPEC_ID_PATTERN = re.compile(r'SPEC-[A-Z]+-\d{3}')

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def check_spec_id(text):
    match = SPEC_ID_PATTERN.search(text)
    if match:
        print(f"[PASS] Spec ID found: {match.group(0)}")
        return True
    else:
        print("[FAIL] Spec ID not found or invalid format (expected: SPEC-UI-001)")
        return False

def check_sections(text):
    found = []
    for section in REQUIRED_SECTIONS:
        pattern = re.compile(rf'^#+\\s*{re.escape(section)}', re.MULTILINE | re.IGNORECASE)
        if pattern.search(text):
            print(f"[PASS] Section found: {section}")
            found.append(section)
        else:
            print(f"[FAIL] Section missing: {section}")
    return len(found) == len(REQUIRED_SECTIONS)

def main():
    path = sys.argv[1] if len(sys.argv) > 1 else 'spec.md'
    if not os.path.isfile(path):
        print(f"[ERROR] Spec file not found: {path}")
        sys.exit(1)
    text = read_file(path)
    print(f"Validating spec: {path}\n---")
    id_ok = check_spec_id(text)
    sections_ok = check_sections(text)
    print("---")
    if id_ok and sections_ok:
        print("[SUCCESS] Spec validation passed.")
        sys.exit(0)
    else:
        print("[FAILURE] Spec validation failed. See above for details.")
        sys.exit(1)

if __name__ == '__main__':
    main() 