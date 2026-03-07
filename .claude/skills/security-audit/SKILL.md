---
name: security-audit
description: Perform security audit on the codebase. Use when reviewing for vulnerabilities, before deployment, or when handling sensitive data.
allowed-tools: Read, Grep, Glob, Bash
---

## Security Audit Process

### Phase 1: Secrets Scan
- Search for hardcoded API keys, tokens, passwords, and credentials
- Check for `.env` files accidentally committed to git
- Verify `.gitignore` covers all sensitive files
- Check for secrets in comments, TODOs, or test fixtures
- Search patterns: `password`, `secret`, `token`, `api_key`, `private_key`, `credential`

### Phase 2: Dependency Audit
- Run the appropriate dependency audit command:
  - Node.js: `npm audit` or `pnpm audit`
  - Python: `pip-audit` or `safety check`
  - Go: `govulncheck ./...`
  - Rust: `cargo audit`
- Flag any high/critical severity vulnerabilities
- Check for outdated dependencies with known CVEs

### Phase 3: Input Validation
- Identify all system boundaries (user input, API endpoints, file uploads)
- Verify input validation and sanitization at each boundary
- Check for SQL injection, XSS, command injection, path traversal
- Verify file upload size limits and type restrictions
- Check that error messages don't leak internal details

### Phase 4: Authentication & Authorization
- Verify authentication is required on protected routes
- Check authorization (role-based access) on sensitive operations
- Review session management (expiry, rotation, secure flags)
- Check CORS configuration
- Verify rate limiting on auth endpoints

### Phase 5: Data Protection
- Check encryption at rest and in transit
- Verify PII handling complies with requirements
- Review logging — no sensitive data in logs
- Check database query patterns for mass data exposure

### Output Format
```
## Security Audit Report

### Critical Issues
- [CRITICAL] Description — file:line — OWASP category

### Warnings
- [WARNING] Description — file:line

### Recommendations
- Recommendation with remediation steps

### Scan Summary
- Files scanned: N
- Critical: N | Warnings: N | Info: N
```
