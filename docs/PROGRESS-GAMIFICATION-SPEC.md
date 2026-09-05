# MasteryOS Progress, Gamification & Productivity Specification

## Purpose

Progress tracking should make sustained mastery easier without turning learning into empty point collection.

## Progress model

Track progress at multiple levels:

`program → phase → domain → topic → lesson → practice → assessment → project → mastery`

The dashboard should distinguish:

- content viewed;
- practice attempted;
- assessment passed;
- mastery demonstrated;
- projects completed;
- weak areas;
- overdue/review items;
- current streak and consistency.

## Mastery evidence

Progress is evidence-based. A high percentage of viewed lessons must not falsely imply equivalent mastery.

## Gate visibility

Before entering a gated topic, show:

- what the learner already knows;
- prerequisites remaining;
- required evidence;
- current level;
- what unlocks next;
- estimated workload where reliable.

## Gamification

Use gamification to reinforce productive behavior:

- XP for meaningful learning actions;
- levels tied to demonstrated competency;
- streaks for consistency, not punishment;
- milestones;
- mastery badges;
- difficult-problem achievements;
- project achievements;
- domain completion markers;
- review/retrieval achievements.

Do not award disproportionate rewards for passive reading/clicking.

## Productivity layer

Support:

- daily focus plan;
- weekly objectives;
- current mission;
- timeboxing;
- study sessions;
- review queue;
- spaced retrieval prompts;
- active backlog;
- reflection after sessions;
- distraction-minimized focus mode.

## Adaptive recommendations

The system should recommend the next action using evidence from:

- failed assessments;
- prerequisite gaps;
- stale knowledge;
- recent performance;
- route requirements;
- unfinished projects;
- learner-selected goals.

Recommendations must remain explainable. Avoid opaque "AI says study X" behavior.

## Local persistence

In v1, progress and productivity state remain local-first. A future synchronization layer must be a deliberate architectural change rather than an accidental dependency.

## Honest progress language

Prefer labels such as:

- Started
- Practicing
- Assessed
- Passed
- Mastered
- Needs review
- Blocked by prerequisite

Do not represent a lesson as "mastered" merely because it was completed.
