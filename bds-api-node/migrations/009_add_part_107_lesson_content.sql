-- Add detailed lesson content to Part 107 course modules
-- Based on official FAA publications (public domain materials):
-- - FAA Remote Pilot Study Guide (FAA-G-8082-22)
-- - 14 CFR Part 107 regulations
-- - FAA Airman Certification Standards (FAA-S-ACS-10B)
-- All materials are public domain per 17 USC § 105

BEGIN;

-- Update course modules with comprehensive lesson content
-- Using dollar-quoted strings to avoid escaping issues

UPDATE course_modules
SET description = $$Welcome to FAA Part 107 Remote Pilot Certification! This module introduces you to the regulatory framework governing small unmanned aircraft systems (sUAS) in the United States.

LESSON TOPICS:
1. History of drone regulations in the U.S.
2. Overview of 14 CFR Part 107 (effective August 29, 2016, with 2021 amendments)
3. Who needs Part 107 certification
4. Certification requirements and process
5. Taking the FAA Knowledge Test
6. Course structure and study approach
7. Required study materials (all FREE from FAA):
   " FAA Remote Pilot Study Guide (FAA-G-8082-22)
   " 14 CFR Part 107 regulations (full text)
   " FAA Airman Certification Standards (FAA-S-ACS-10B)
   " FAA sample test questions

KEY LEARNING OBJECTIVES:
 Understand the scope and applicability of Part 107
 Identify who must obtain remote pilot certification
 Describe the certification process
 Access official FAA study materials

OFFICIAL FAA REFERENCE: FAA Remote Pilot Study Guide Chapter 1

---

This course incorporates official FAA public domain materials. All FAA publications are freely available from faa.gov and can be legally used for commercial training per 17 USC § 105.$$
WHERE course_id = (SELECT id FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification' LIMIT 1)
AND order_index = 1;

UPDATE course_modules
SET description = $$Study the foundational regulations of Part 107, including definitions, abbreviations, and general provisions.

LESSON TOPICS - 14 CFR PART 107 SUBPART A:
" §107.1 - Applicability
" §107.3 - Definitions (Critical terms you MUST know)
" §107.5 - Falsification, reproduction or alteration
" §107.7 - Inspection, testing, and demonstration of compliance
" §107.9 - Accident reporting

CRITICAL DEFINITIONS TO MEMORIZE:
" Small unmanned aircraft: Weighs less than 55 pounds on takeoff
" Small unmanned aircraft system (sUAS): Small unmanned aircraft + associated elements
" Remote pilot in command: Person directly responsible for sUAS operation
" Visual observer: Person assisting remote PIC with see-and-avoid
" Control station: Interface for piloting the sUAS
" Corrective lenses: Spectacles or contact lenses

ACCIDENT REPORTING REQUIREMENTS (§107.9):
Must report to FAA within 10 days if operation results in:
" Serious injury (hospitalization >48 hours within 7 days of injury)
" Loss of consciousness
" Property damage e$500 (other than the sUAS)

KEY LEARNING OBJECTIVES:
 Define key Part 107 terms
 Understand accident reporting requirements
 Know inspection and compliance rules

OFFICIAL FAA REFERENCE: 14 CFR Part 107 Subpart A, Remote Pilot Study Guide pgs 2-4$$
WHERE course_id = (SELECT id FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification' LIMIT 1)
AND order_index = 2;

UPDATE course_modules
SET description = $$Master the core operating rules that govern all Part 107 operations. These are the most tested topics on the exam.

OPERATING RULES - 14 CFR PART 107 SUBPART B:

PILOT REQUIREMENTS (§107.12, §107.17, §107.19):
" Must be at least 16 years old
" Must pass aeronautical knowledge test (recurrent every 24 months)
" Must be able to read, speak, write, and understand English
" Must make sUAS available for inspection

OPERATIONAL LIMITS (§107.51):
" Maximum groundspeed: 87 knots (100 mph)
" Maximum altitude: 400 feet AGL, OR within 400 feet of structure
" Minimum visibility: 3 statute miles from control station
" Minimum distance from clouds: 500 feet below, 2,000 feet horizontal
" Daylight operations only (unless certified for night ops with anti-collision lighting)
" Visual line of sight (VLOS) required
" May NOT operate from moving aircraft
" May NOT operate from moving vehicle (unless in sparsely populated area)

RIGHT-OF-WAY RULES (§107.37):
" sUAS must yield to ALL manned aircraft
" Remote PIC must see and avoid other aircraft

ALCOHOL & DRUGS (§107.27, §107.29):
" No operations within 8 hours of alcohol consumption
" Blood alcohol must be <0.04%
" No operations under influence of any drug that affects capacity

KEY LEARNING OBJECTIVES:
 Memorize all operational limits and restrictions
 Understand right-of-way rules
 Know when waivers are required
 Identify prohibited operations

OFFICIAL FAA REFERENCE: 14 CFR Part 107 Subpart B (§107.11-§107.51), Remote Pilot Study Guide Chapter 2$$
WHERE course_id = (SELECT id FROM courses WHERE title = 'FAA Part 107 Remote Pilot Certification' LIMIT 1)
AND order_index = 3;

-- Add disclaimer to course description
UPDATE courses
SET description = $$Comprehensive college-level course for FAA Part 107 Remote Pilot Certification. This course integrates official FAA content including 14 CFR Part 107 regulations, the FAA Remote Pilot Study Guide, and Airman Certification Standards.

Features official FAA public domain materials freely available from faa.gov. All FAA publications can be legally used for commercial training per 17 USC § 105.

Prepare for your commercial drone license with structured lessons covering all exam topics: regulations, airspace, weather, operations, and performance. Real-world applications and expert instruction included.

Not affiliated with or endorsed by the FAA.$$
WHERE title = 'FAA Part 107 Remote Pilot Certification';

COMMIT;
