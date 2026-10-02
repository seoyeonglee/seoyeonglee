# Seoyoung Lee — Full-Stack & Applied AI Engineering Portfolio

I build **full-stack applications, backend/data platforms, automation systems, and applied AI tooling** with a strong focus on reliability, observability, and real operational problems.

My primary languages are **JavaScript / TypeScript / Python**. I also have hands-on experience with **Node.js, React, Vue.js, FastAPI, PostgreSQL, MySQL, Redis, Docker, SQL, and GitHub Actions**.

My background spans software development, fintech, security, digital forensics, fraud/risk analytics, and automation. That domain depth is useful because I do not approach software as isolated code — I am used to translating ambiguous business and operational problems into working systems.

## Featured engineering projects

The projects below are portfolio/reference implementations. Data-driven demos use synthetic data, with scope and limitations documented in each repository.

### [Audit Evidence / Operations](https://github.com/seoyeonglee/audit-evidence-agent)

A full-stack evidence-review workspace with source-backed records, role/tenant boundaries, leased SQL jobs, version-checked human approval, and append-only audit history. A separate **RAG Lab** demonstrates TF-IDF retrieval, citation validation, and an optional OpenAI reasoner.

**React · TypeScript · FastAPI · SQLAlchemy · PostgreSQL / SQLite · pytest · Playwright**

The public demo uses SQLite and fictional personas. PostgreSQL row-level isolation and concurrency are covered by a separate integration suite.

[Live demo](https://seoyoung-audit-evidence.onrender.com) · [Architecture](https://github.com/seoyeonglee/audit-evidence-agent/blob/main/docs/architecture.md) · [Tests](https://github.com/seoyeonglee/audit-evidence-agent/tree/main/tests/platform) · [AI boundaries](https://github.com/seoyeonglee/audit-evidence-agent/blob/main/docs/ai-pipeline.md)

---

### [FinScope · Fintech Usage & Recommendation Intelligence](https://github.com/seoyeonglee/fintech-usage-recommender)

An interactive usage-analytics and recommendation app with cohort/period filters, adjustable hybrid-ranking weights, explainable score contributions, cold-start handling, and time-split offline evaluation.

**React · TypeScript · Vite · Node.js · Playwright · GitHub Actions**

The browser and evaluation scripts share the same domain engine. It runs on synthetic sessions without bank-account connections; reported metrics validate this bounded dataset, not real-market performance.

[Live demo](https://seoyoung-finscope.onrender.com/) · [Architecture](https://github.com/seoyeonglee/fintech-usage-recommender/blob/main/docs/architecture.md) · [Evaluation & limitations](https://github.com/seoyeonglee/fintech-usage-recommender/blob/main/docs/model-card.md) · [Browser verification](https://github.com/seoyeonglee/fintech-usage-recommender/blob/main/docs/browser-verification.json)

---

### [Crypto Transaction Tracer](https://github.com/seoyeonglee/crypto-transaction-tracer)

An interactive investigation console for directional hop tracing, transaction-graph exploration, and explainable fan-in, fan-out, peel-chain, and risk-proximity signals. Evidence panels connect each result to its underlying synthetic transactions.

**React · TypeScript · Cytoscape.js · FastAPI · Python · Pandas · NetworkX · Docker**

All wallets, labels, and cases are fictional; detected patterns are investigative leads, not attribution.

[Live demo](https://seoyoung-crypto-tracer.onrender.com) · [Architecture](https://github.com/seoyeonglee/crypto-transaction-tracer#architecture) · [Tests](https://github.com/seoyeonglee/crypto-transaction-tracer/tree/main/tests)

---

### [High-Throughput Event Platform](https://github.com/seoyeonglee/high-throughput-event-platform)

An end-to-end event platform connecting a React operations console to a FastAPI ingestion API, Redis Streams workers, and PostgreSQL analytics.

**React · TypeScript · FastAPI · PostgreSQL · Redis Streams · Docker · Prometheus**

Demonstrates atomic ingestion idempotency, durable deduplication, retries/DLQ, worker crash recovery, and frontend/API integration. Includes reproducible benchmark tooling without claiming unmeasured throughput.

[Architecture](https://github.com/seoyeonglee/high-throughput-event-platform/blob/main/docs/architecture.md) · [Benchmark method](https://github.com/seoyeonglee/high-throughput-event-platform/blob/main/docs/benchmarks.md)

---

### [AI Infra Observability](https://github.com/seoyeonglee/ai-infra-observability)

An observability reference stack with service metrics, structured logs, alert routing, rule-based incident classification, and runbook-oriented response recommendations.

**Python · FastAPI · Prometheus · VictoriaMetrics · Grafana · EFK · Alertmanager · Kubernetes · NVIDIA DCGM**

Docker Compose exercises simulated inference telemetry locally. Kubernetes manifests provide a DCGM integration path for GPU-equipped clusters; this project does not claim production GPU-cluster operations.

---

### [Hold'em Real-Time Server Lab](https://github.com/seoyeonglee/seoyeonglee/tree/main/projects/holdem-realtime-lab)

A browser-based real-time Hold'em prototype with server-authoritative state, an explicit street state machine, CSPRNG-backed shuffling, and React/PixiJS rendering.

**TypeScript · Node.js · WebSocket · React · PixiJS · CSPRNG**

A learning lab with Redis/PostgreSQL architecture notes, not a production-certified poker engine.

---

### [Privacy Access Monitor](https://github.com/seoyeonglee/privacy-access-monitor)

An explainable access-monitoring pipeline based on behavioral baselines and rule-based risk scoring over synthetic access logs.

**Python · Pandas · Detection Rules · Behavioral Analytics · Tests/CI**

---

### [Fraud Risk Engine](https://github.com/seoyeonglee/fraud-risk-engine)

A synthetic fraud-risk engine combining customer baselines, transaction rules, velocity detection, and transparent scoring.

**Python · Pandas · Fraud Analytics · Rule Engine · Tests/CI**

---

## Development background

- **JavaScript / TypeScript / Python:** primary development languages
- **Frontend:** React, Vue.js, HTML/CSS, browser/DOM programming, responsive UI
- **Backend / API:** Node.js, FastAPI, REST APIs, asynchronous processing
- **Data:** PostgreSQL, MySQL, Redis, SQL, Pandas, NetworkX
- **Infrastructure:** Docker, Docker Compose, Kubernetes foundations, Prometheus/Grafana
- **Quality:** pytest, GitHub Actions, reproducible local environments, synthetic test data
- **Teaching:** JavaScript application development and Python/data-analysis instruction through SSAFY/freelance teaching

## Selected applied engineering experience

- Built Python automation, crawling, data-processing, and AI-agent workflows in financial/forensic environments
- Developed a Python-based audio manipulation analysis workflow plus web-crawling and speech-to-text tooling
- Designed data-driven monitoring and detection logic with engineering/data teams
- Built and operated client-facing web/service workflows in a legal-tech environment
- Worked across product, engineering, data, security, compliance, and legal stakeholders to turn requirements into operational systems

## Engineering approach

I prefer projects that show more than isolated algorithms:

- a usable UI or API
- clear architecture and data flow
- reproducible setup
- tests and CI
- observable behavior
- explicit failure handling
- realistic production trade-offs

I use AI coding tools as an accelerator for implementation and review, while keeping architecture, debugging, validation, and final technical decisions human-owned.

---

### Links

- [Web Portfolio](https://seoyounglee-portfolio.vercel.app/)
- [GitHub](https://github.com/seoyeonglee)
