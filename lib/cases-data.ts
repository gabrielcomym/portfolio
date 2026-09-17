export type CaseDetail = { label: string; copy: string }

export type CaseSection = { heading: string; ctaLabel: string; details: CaseDetail[] }

export type CaseStudy = {
  slug: string
  title: string
  dek: string
  metaTags: string[]
  workIntro: string
  projectDescription: string[]
  outcome: string[]
  sections: CaseSection[]
  cardImage: string
  heroImage: string
}

/** Canonical order for the four public cases; archived material is stored privately. */
export const CASE_ORDER = ['kedro', 'rivendell', 'wovenlight', 'performanceai'] as const

export const CASES: Record<string, CaseStudy> = {
  "kedro": {
    "slug": "kedro",
    "title": "Kedro",
    "dek": "Turning a technical framework into a mature product experience.",
    "metaTags": [
      "McKinsey & Company",
      "Principal Designer",
      "Shipped",
      "Open-source",
      "Product Design",
      "Design Direction",
      "Technical UX",
      "ML Workflows",
      "Design Systems",
      "Research",
      "Prototyping",
      "Usability Testing",
      "Roadmap Influence"
    ],
    "workIntro": "I helped mature Kedro from a powerful technical framework into a trusted product experience for data science teams, enterprise users, and the open-source community.",
    "projectDescription": [
      "Kedro had already proven that data science workflows could be more modular, reproducible, and maintainable. The next challenge was product maturity: helping technical users understand complex pipeline relationships, compare experiments, and communicate value beyond the codebase.",
      "As Principal Designer, I led product design and design direction across Kedro and Kedro-Viz, working across research, interaction design, technical constraints, design systems, QA, branding, mentorship, and product strategy."
    ],
    "outcome": [
      "Kedro matured into a widely adopted open-source and enterprise data science product, recognized by Fast Company, the UK Technical Communication Awards, and the AI Awards.",
      "Kedro-Viz became part of the working toolkit for teams across enterprise, government, research, and data-intensive organizations, with visible adoption across NASA, NHS, McKinsey & Company, AI Singapore, GetInData, Telkomsel, SBERT, Helvetas, and others."
    ],
    "sections": [
      {
        "heading": "Making hidden structure visible.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "Kedro helped data science teams build modular, reproducible pipelines, but large projects could become difficult to understand once workflows grew in size and complexity."
          },
          {
            "label": "My role",
            "copy": "I led the product design direction for Modular Pipelines in Kedro-Viz, working across research, interaction design, prototyping, design QA, and technical collaboration."
          },
          {
            "label": "Design challenge",
            "copy": "Users needed to understand how pipeline parts related to each other without losing the full system view or relying only on code-level knowledge."
          },
          {
            "label": "Approach",
            "copy": "I explored navigation models, grouping patterns, visual hierarchy, progressive detail, and technical constraints with engineers and product stakeholders."
          },
          {
            "label": "Outcome",
            "copy": "Modular Pipelines made complex data workflows easier to inspect, explain, and communicate across technical and non-technical audiences."
          }
        ]
      },
      {
        "heading": "Preserving value through integration.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "PerformanceAI had explored valuable model comparison and experiment-tracking capabilities, but the product direction needed to be consolidated into Kedro-Viz."
          },
          {
            "label": "My role",
            "copy": "I helped translate the most valuable parts of the previous product into a native Kedro-Viz workflow."
          },
          {
            "label": "Design challenge",
            "copy": "The team needed to preserve useful capability without simply copying a separate product into an existing one."
          },
          {
            "label": "Approach",
            "copy": "I mapped user needs, compared existing flows, prototyped interaction models, reviewed technical constraints, and worked closely with engineering through QA."
          },
          {
            "label": "Outcome",
            "copy": "Experiment Tracking became part of the Kedro-Viz experience, allowing users to compare model runs and understand experiment history inside the broader product workflow."
          }
        ]
      },
      {
        "heading": "Maturing a framework into a product ecosystem.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "Kedro was moving from a powerful technical framework toward a broader open-source and enterprise product experience."
          },
          {
            "label": "My role",
            "copy": "I led design direction across product experience, visual consistency, design systems, branding, research, mentorship, and quality practices."
          },
          {
            "label": "Design challenge",
            "copy": "The product needed to feel coherent across documentation, interface, community touchpoints, and enterprise usage."
          },
          {
            "label": "Approach",
            "copy": "I worked across product rituals, design QA, stakeholder alignment, interface patterns, research synthesis, and contribution workflows."
          },
          {
            "label": "Outcome",
            "copy": "Kedro matured into a more trusted product ecosystem with stronger usability, clearer product language, and broader adoption signals."
          }
        ]
      }
    ],
    "cardImage": "/media/thumbs%20home/thumb_kedro.png",
    "heroImage": "/media/project/kedro/header%20kedro.png"
  },
  "rivendell": {
    "slug": "rivendell",
    "title": "Rivendell",
    "dek": "Designing a planning sandbox for high-risk industrial operations.",
    "metaTags": [
      "McKinsey / QuantumBlack",
      "Principal Designer",
      "Prescriptive Analytics",
      "Industrial Operations",
      "Decision Support",
      "Optimization",
      "Predictive Modeling",
      "Data-heavy Workflows",
      "Expert Tools",
      "Human-in-the-loop",
      "Systems Thinking",
      "Operational Risk"
    ],
    "workIntro": "I helped shape a decision-support experience for a complex port operation, turning fragmented operational data, predictive models, physical constraints, and optimization logic into a clearer planning sandbox for shift-based decisions.",
    "projectDescription": [
      "Rivendell was a prescriptive analytics concept for a complex mineral-export port operation. It connected fragmented data across trains, equipment, stockpiles, conveyors, ship loaders, and vessels to support clearer planning decisions.",
      "As Principal Designer at McKinsey / QuantumBlack, I translated throughput prediction, route constraints, and optimization into a planning sandbox where experts could compare viable scenarios and make better decisions under time pressure."
    ],
    "outcome": [
      "The work translated a complex mineral-export operation into a human-in-the-loop planning concept, connecting operational data, predictive throughput modeling, and optimization so users could inspect the network, compare feasible shift scenarios, and understand the constraints behind each recommendation. It framed the product as a practical decision layer for high-risk industrial planning, giving operators clearer trade-offs without replacing expert judgment."
    ],
    "sections": [
      {
        "heading": "Seeing the operation as a system.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "The operation depended on a chain of interdependent physical assets. A delay in a train queue, a restriction at a car dumper, a conveyor below target, a stockpile near capacity, or a vessel constraint could shift the bottleneck and invalidate the plan."
          },
          {
            "label": "My role",
            "copy": "I helped frame the product around the operational decision, not only around data visibility. The experience needed to help users understand the state of the system before exploring alternatives."
          },
          {
            "label": "Design challenge",
            "copy": "The interface had to represent a complex physical network without overwhelming users with asset-level detail, data quality issues, and changing operational conditions."
          },
          {
            "label": "Approach",
            "copy": "I worked from the operation outward: network overview, movement table, route performance, asset detail, queues, vessels, and shift schedule. The product direction separated observed data, assumptions, constraints, predictions, and recommendations."
          },
          {
            "label": "Outcome",
            "copy": "The work moved toward a shared operational picture that could support faster diagnosis, better planning conversations, and more credible scenario comparison."
          }
        ]
      },
      {
        "heading": "Making constraints part of the experience.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "Rivendell was not just predicting throughput. Operational plans had to respect physical constraints: equipment capacity, route overlap, stockpile limits, maintenance windows, vessel commitments, weather, tide, and data availability."
          },
          {
            "label": "My role",
            "copy": "I helped translate constraint logic into product behavior: what the user could do, what the system should block, what it should explain, and where expert override should remain possible."
          },
          {
            "label": "Design challenge",
            "copy": "Optimization can easily become a black box. The product needed to show why an option was recommended, risky, or impossible without exposing raw model complexity as the primary experience."
          },
          {
            "label": "Approach",
            "copy": "I shaped patterns for scenario comparison, constraint states, confidence cues, blocked routes, manual overrides, and rationale. The goal was to make the recommendation understandable, auditable, and safe to question."
          },
          {
            "label": "Outcome",
            "copy": "The experience positioned optimization as decision support: users stayed in control, while the system made constraints, trade-offs, and operational consequences more explicit."
          }
        ]
      },
      {
        "heading": "Comparing plans before acting.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "Planning decisions happened under time pressure. Users needed to decide whether changing route, sequence, setpoint, or material plan would improve the shift without creating downstream problems."
          },
          {
            "label": "My role",
            "copy": "I helped define the planning loop: load the operational state, validate data, inspect the baseline, generate viable scenarios, compare impact, adjust constraints, approve a plan, and learn from planned versus actual outcomes."
          },
          {
            "label": "Design challenge",
            "copy": "The product had to make scenario exploration fast enough for operational use and trustworthy enough for high-stakes decisions."
          },
          {
            "label": "Approach",
            "copy": "I framed the MVP around one complete decision loop for a single shift, with comparison views, impact deltas, confidence, assumptions, and an audit trail for human decisions."
          },
          {
            "label": "Outcome",
            "copy": "The case demonstrates product thinking across prescriptive analytics, operational systems, predictive modeling, optimization, and human-in-the-loop decision-making."
          }
        ]
      }
    ],
    "cardImage": "/media/thumbs%20home/thumb_rivendell.png",
    "heroImage": "/media/project/rivendell/header%20rivendell.png"
  },
  "wovenlight": {
    "slug": "wovenlight",
    "title": "WovenLight",
    "dek": "Designing AI-native workflows for high-stakes investment analysis.",
    "metaTags": [
      "Principal Designer",
      "AI Workflows",
      "Agentic UX",
      "Private Equity",
      "Expert Tools",
      "Product Architecture",
      "Automation",
      "Enterprise UX",
      "Data-heavy Workflows",
      "Strategy",
      "Systems Design",
      "Design QA"
    ],
    "workIntro": "I designed AI-assisted workflows that helped investment teams move through complex research, analysis, and decision-making with more clarity, control, and confidence.",
    "projectDescription": [
      "WovenLight operated in a high-stakes environment where investment teams needed to process large amounts of company, market, and financial information without losing judgment or accountability.",
      "The design challenge was not simply to add AI into the workflow, but to shape an experience where automation supported expert reasoning, made analytical steps easier to follow, and preserved user control."
    ],
    "outcome": [
      "The work turned a hard-coded internal tool into WovenLight's first modular AI workflow product, creating a clearer product architecture for co-investment appraisal, commercial pitches, and private-equity value creation.",
      "Rapid Diagnostic Reports reduced RDR-related pitch work from 3 hours to 1 hour, was used in at least 75% of applicable sales pitches, supported live commercial demos, and helped enable the company's first co-investment deal."
    ],
    "sections": [
      {
        "heading": "Turning expertise into workflow.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "Investment analysis involved expert judgment, fragmented information, and repeated manual work across research, appraisal, and decision-making."
          },
          {
            "label": "My role",
            "copy": "I helped shape AI-assisted workflows that translated expert behavior into structured product patterns."
          },
          {
            "label": "Design challenge",
            "copy": "The product needed to support senior analytical judgment without oversimplifying the complexity of investment work."
          },
          {
            "label": "Approach",
            "copy": "I mapped workflows, identified repeatable decision patterns, designed task flows, and shaped interface concepts for expert users."
          },
          {
            "label": "Outcome",
            "copy": "The work turned ambiguous expert processes into clearer workflows that could support scale, consistency, and productization."
          }
        ]
      },
      {
        "heading": "Designing for trust in AI output.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "AI could accelerate analysis, but users still needed confidence, source visibility, and control before trusting outputs in high-stakes decisions."
          },
          {
            "label": "My role",
            "copy": "I designed interaction patterns for review, traceability, confidence, and user oversight."
          },
          {
            "label": "Design challenge",
            "copy": "The experience needed to make AI useful without making it feel opaque or overconfident."
          },
          {
            "label": "Approach",
            "copy": "I explored source-backed responses, review states, editable outputs, confidence cues, and human-in-the-loop controls."
          },
          {
            "label": "Outcome",
            "copy": "The product direction emphasized AI as an analytical partner, not an autonomous black box."
          }
        ]
      },
      {
        "heading": "Making complex work repeatable.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "Many analytical tasks were bespoke, manual, and difficult to standardize across teams."
          },
          {
            "label": "My role",
            "copy": "I helped define reusable workflow structures and product architecture for AI-assisted analysis."
          },
          {
            "label": "Design challenge",
            "copy": "The system needed to support repeated workflows while preserving flexibility for expert judgment."
          },
          {
            "label": "Approach",
            "copy": "I structured common tasks, mapped exceptions, designed reusable patterns, and connected workflow steps into a more coherent platform model."
          },
          {
            "label": "Outcome",
            "copy": "The work created a more scalable foundation for complex investment workflows and AI-assisted decision support."
          }
        ]
      }
    ],
    "cardImage": "/media/thumbs%20home/thumb_wovenlight.png",
    "heroImage": "/media/project/wovenlight/header%20wovenlight.png"
  },
  "performanceai": {
    "slug": "performanceai",
    "title": "PerformanceAI",
    "dek": "Defining a 0-to-1 vision for model performance monitoring.",
    "metaTags": [
      "0-to-1 Strategy",
      "ML Monitoring",
      "Data Products",
      "Risk UX",
      "Product Vision",
      "Technical Systems",
      "AI/ML Workflows",
      "Concept Strategy",
      "Enterprise UX",
      "Product Architecture"
    ],
    "workIntro": "I helped shape a product vision for sustaining the value of machine-learning models after delivery, turning model degradation, monitoring, alerting, and corrective action into a clearer product direction for engineering teams and client engagements.",
    "projectDescription": [
      "PerformanceAI explored how teams could sustain the value of machine-learning models after project delivery. Once models moved into live environments, changes in data, external conditions, business processes, and regulation could degrade performance and create business, reputational, legal, and regulatory risk.",
      "My role focused on turning that risk into product clarity: defining user needs, shaping the product vision, mapping the model-monitoring lifecycle, and designing concepts for dashboards, alerts, model-run comparison, reproducibility, and corrective action."
    ],
    "outcome": [
      "PerformanceAI was adopted by machine-learning engineers across the Firm and applied across numerous client engagements, helping teams monitor model runs, compare performance, and sustain analytical value beyond project delivery.",
      "The product established a reusable model for ML performance workflows across four user groups, combining a Python API library with a React/Node frontend for monitoring, dashboards, alerts, and model-run comparison.",
      "Its configurable monitoring system helped teams detect model degradation across data consistency, output stability, and model performance, and later became a foundation for related integration work inside Kedro-Viz and the broader Kedro ecosystem."
    ],
    "sections": [
      {
        "heading": "Finding the product in the ambiguity.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "Machine-learning models could create measurable value during client delivery, but that value could decay once models entered live environments. Changes in input data, business processes, external conditions, and regulation could affect assumptions and performance."
          },
          {
            "label": "My role",
            "copy": "I helped translate ambiguity into product direction through research synthesis, concept development, and strategic framing."
          },
          {
            "label": "Design challenge",
            "copy": "The product needed to make the risk visible enough for business users, risk managers, data scientists, and team directors while staying technically useful for machine-learning engineers."
          },
          {
            "label": "Approach",
            "copy": "I mapped the problem space around business, reputational, legal, and regulatory risk; clarified user needs across four roles; and helped frame the product around four core capabilities: configure, detect, understand, and correct."
          },
          {
            "label": "Outcome",
            "copy": "The work created a clearer 0-to-1 product direction for sustaining analytical value beyond project delivery."
          }
        ]
      },
      {
        "heading": "Designing visibility for model behavior.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "Technical users needed to understand how models performed over time, across runs, and under changing conditions, while also tracking data consistency, output stability, and model performance against real-world outcomes."
          },
          {
            "label": "My role",
            "copy": "I designed concepts for making model behavior more legible through comparison, monitoring, and signal hierarchy."
          },
          {
            "label": "Design challenge",
            "copy": "The interface needed to reveal model failures and performance shifts without overwhelming users with raw technical complexity."
          },
          {
            "label": "Approach",
            "copy": "I explored dashboards, comparison views, alerting logic, drift signals, performance summaries, and ways to highlight which features or parameters triggered an alert."
          },
          {
            "label": "Outcome",
            "copy": "The work helped define how model behavior could become visible, explainable, and actionable inside a product experience."
          }
        ]
      },
      {
        "heading": "Creating a direction others could build from.",
        "ctaLabel": "Read more",
        "details": [
          {
            "label": "Context",
            "copy": "The product had to work as both a technical tool and a commercial offering: a Python API library for logging model metrics and a frontend application for monitoring, dashboards, and alerts."
          },
          {
            "label": "My role",
            "copy": "I created product concepts, interaction models, and strategic framing to support shared direction."
          },
          {
            "label": "Design challenge",
            "copy": "The team needed enough clarity to discuss, critique, and build from the same product vision across data science, engineering, client delivery, and product stakeholders."
          },
          {
            "label": "Approach",
            "copy": "I used prototypes, product flows, visual models, architecture framing, and roadmap concepts to make the product opportunity tangible."
          },
          {
            "label": "Outcome",
            "copy": "The work gave stakeholders a clearer foundation for decision-making, adoption across the Firm, and later integration into adjacent Kedro ecosystem work."
          }
        ]
      }
    ],
    "cardImage": "/media/thumbs%20home/thumb_performanceai.png",
    "heroImage": "/media/project/performanceai/header%20performanceai.png"
  }
}
