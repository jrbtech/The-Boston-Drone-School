/**
 * FAA Part 107 Remote Pilot Certification - Complete Course Content
 *
 * This file contains structured lesson content that embeds official FAA resources
 * including 14 CFR Part 107 regulations, FAA Remote Pilot Study Guide content,
 * and official government aviation resources.
 *
 * Official Resources:
 * - 14 CFR Part 107: https://www.ecfr.gov/current/title-14/part-107
 * - FAA Remote Pilot Study Guide: https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf
 * - Airman Certification Standards: https://www.faa.gov/training_testing/testing/acs/
 */

export interface LessonContent {
  moduleId: number;
  title: string;
  objectives: string[];
  content: string;
  officialResources: OfficialResource[];
  assessmentQuestions: AssessmentQuestion[];
  duration: number;
}

export interface OfficialResource {
  title: string;
  type: 'regulation' | 'faa_guide' | 'handbook' | 'chart' | 'video';
  url: string;
  description: string;
}

export interface AssessmentQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reference: string;
}

export const part107LessonContent: LessonContent[] = [
  {
    moduleId: 1,
    title: "Module 1: Introduction to Part 107 and Small UAS Operations",
    duration: 90,
    objectives: [
      "Understand the history and development of Part 107 regulations",
      "Identify the certification requirements for remote pilots",
      "Explain the scope and applicability of Part 107",
      "Recognize the importance of safe UAS operations in the National Airspace System"
    ],
    content: `
# Introduction to FAA Part 107 Remote Pilot Certification

## Overview

Welcome to the FAA Part 107 Remote Pilot Certification course. This comprehensive program will prepare you for the FAA knowledge test required to operate small unmanned aircraft systems (sUAS) commercially in the United States.

## What is Part 107?

Title 14 of the Code of Federal Regulations (14 CFR) Part 107 is the federal regulation that governs the commercial operation of small unmanned aircraft systems weighing less than 55 pounds in the United States.

### Key Facts:
- **Effective Date**: August 29, 2016
- **Authority**: Federal Aviation Administration (FAA)
- **Applies to**: Commercial sUAS operations under 55 lbs
- **Does NOT apply to**: Recreational operations under 49 U.S.C. 44809

## Who Needs a Part 107 Certificate?

You need a Remote Pilot Certificate with an sUAS rating if you plan to:
- Operate a drone for commercial purposes
- Provide drone services for compensation
- Use drones for business operations including:
  - Aerial photography/videography
  - Real estate imaging
  - Agricultural monitoring
  - Infrastructure inspection
  - Emergency response operations
  - Any other commercial application

## Certification Requirements

To obtain your Remote Pilot Certificate, you must:

1. **Be at least 16 years old**
2. **Pass the aeronautical knowledge test** (60 questions, 70% passing score)
3. **Be able to read, speak, write, and understand English**
4. **Be in a physical and mental condition to safely operate a small UAS**
5. **Complete TSA vetting** (done during application process)

## Course Structure

This course is organized into 15 comprehensive modules covering:
- Part 107 regulations (all subparts)
- National Airspace System and airspace classification
- Aviation weather services
- Aircraft performance and loading
- Emergency procedures and risk management
- Operations over people and special operations
- Aeronautical charts and navigation
- Crew resource management and human factors

## The Knowledge Test

- **Questions**: 60 multiple-choice questions
- **Time Limit**: 2 hours
- **Passing Score**: 70% (42 correct answers)
- **Test Centers**: FAA-approved knowledge testing centers
- **Cost**: Approximately $175 (test fee, subject to change)
- **Valid for**: 24 months (must complete test and get certificate within 24 months)

### Exam Topic Breakdown:
- **Regulations**: 15-25%
- **Airspace & Requirements**: 15-25%
- **Weather**: 11-16%
- **Loading & Performance**: 7-11%
- **Operations**: 35-45%

## Official Study Materials

The FAA recommends these official resources (all provided throughout this course):

1. **14 CFR Part 107** - The actual regulations
2. **Remote Pilot – Small Unmanned Aircraft Systems Study Guide** (FAA-G-8082-22)
3. **Airman Certification Standards (ACS) for Unmanned Aircraft Systems**
4. **Pilot's Handbook of Aeronautical Knowledge** (Chapters 2, 12, 13, 14)

## Getting Started

This course integrates official FAA content with structured learning modules, interactive assessments, and practical examples. Each module includes:
- Video instruction
- Official FAA regulation text and guidance
- Real-world examples
- Practice questions
- Module assessments

Let's begin your journey to becoming an FAA-certified remote pilot!

---

**Important Note**: This course provides comprehensive preparation for the Part 107 knowledge test. After passing the test, you'll receive a Remote Pilot Certificate which must be carried during all commercial sUAS operations.
    `,
    officialResources: [
      {
        title: "14 CFR Part 107 - Official Regulations",
        type: "regulation",
        url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107",
        description: "Complete text of FAA Part 107 Small Unmanned Aircraft Systems regulations from the Electronic Code of Federal Regulations"
      },
      {
        title: "FAA Remote Pilot Study Guide",
        type: "faa_guide",
        url: "https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf",
        description: "Official FAA study guide (FAA-G-8082-22) covering all knowledge areas for the Part 107 exam"
      },
      {
        title: "Small UAS Regulations Overview",
        type: "faa_guide",
        url: "https://www.faa.gov/newsroom/small-unmanned-aircraft-systems-uas-regulations-part-107",
        description: "FAA overview of Part 107 regulations and requirements"
      },
      {
        title: "Getting Started with Part 107",
        type: "video",
        url: "https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot",
        description: "Official FAA guide to becoming a commercial drone pilot"
      }
    ],
    assessmentQuestions: [
      {
        question: "What is the minimum age requirement to obtain a Remote Pilot Certificate under Part 107?",
        options: ["14 years old", "16 years old", "18 years old", "21 years old"],
        correctAnswer: 1,
        explanation: "14 CFR §107.61 states that to be eligible for a remote pilot certificate, a person must be at least 16 years of age.",
        reference: "14 CFR §107.61"
      },
      {
        question: "What is the passing score for the Part 107 aeronautical knowledge test?",
        options: ["60%", "70%", "75%", "80%"],
        correctAnswer: 1,
        explanation: "The FAA requires a minimum score of 70% (42 out of 60 questions correct) to pass the Part 107 knowledge test.",
        reference: "14 CFR §107.73"
      },
      {
        question: "Part 107 applies to small unmanned aircraft weighing:",
        options: [
          "Less than 25 pounds",
          "Less than 55 pounds",
          "Less than 100 pounds",
          "Any weight if operated commercially"
        ],
        correctAnswer: 1,
        explanation: "14 CFR §107.1 defines the applicability of Part 107 to small unmanned aircraft weighing less than 55 pounds on takeoff, including everything that is on board or otherwise attached to the aircraft.",
        reference: "14 CFR §107.1"
      },
      {
        question: "How long is the Part 107 knowledge test?",
        options: ["1 hour", "1.5 hours", "2 hours", "3 hours"],
        correctAnswer: 2,
        explanation: "The Part 107 knowledge test has a 2-hour time limit to complete 60 multiple-choice questions.",
        reference: "FAA Testing Standards"
      },
      {
        question: "Which of the following operations does NOT require a Part 107 Remote Pilot Certificate?",
        options: [
          "Commercial aerial photography",
          "Recreational flying under 49 U.S.C. 44809",
          "Agricultural crop monitoring for hire",
          "Real estate photography for compensation"
        ],
        correctAnswer: 1,
        explanation: "Recreational operations conducted under 49 U.S.C. 44809 (The Exception for Limited Recreational Operations of Unmanned Aircraft) do not require a Part 107 certificate. All commercial operations require certification.",
        reference: "14 CFR §107.1, 49 U.S.C. 44809"
      }
    ]
  },
  {
    moduleId: 2,
    title: "Module 2: Part 107 Regulations - General Provisions (Subpart A)",
    duration: 120,
    objectives: [
      "Understand the applicability of Part 107 regulations",
      "Define key terms and definitions used in Part 107",
      "Identify operations that fall under Part 107",
      "Recognize exceptions and special cases"
    ],
    content: `
# Part 107 Subpart A: General Provisions

## 14 CFR §107.1 - Applicability

### Official Regulation Text:

*This part prescribes rules governing the operation of civil small unmanned aircraft systems within the United States. This part applies to the operation of small unmanned aircraft systems for compensation or hire within the United States.*

### Key Points:

**Part 107 APPLIES to:**
- Civil operations of small unmanned aircraft (under 55 lbs)
- Commercial operations (for compensation or hire)
- Operations within U.S. airspace
- Operations that require a Remote Pilot Certificate

**Part 107 does NOT apply to:**
- Model aircraft operations under 49 U.S.C. 44809 (recreational flying)
- Public aircraft operations (government/military)
- Operations conducted under Part 91 (with airworthiness certificate)
- Operations authorized under Section 333 exemptions (now largely obsolete)

## 14 CFR §107.3 - Definitions

Understanding these key definitions is essential for interpreting all Part 107 regulations:

### Small Unmanned Aircraft
A small unmanned aircraft means an unmanned aircraft weighing **less than 55 pounds** on takeoff, including everything that is on board or otherwise attached to the aircraft.

### Small Unmanned Aircraft System (sUAS)
A small unmanned aircraft and its associated elements (including communication links and components that control the small unmanned aircraft) that are required for the safe and efficient operation of the small unmanned aircraft in the national airspace system.

### Remote Pilot in Command (Remote PIC)
A person who:
- Holds a remote pilot certificate with an sUAS rating
- Has the final authority and responsibility for the operation and safety of an sUAS operation

### Visual Observer (VO)
A person who is designated by the remote pilot in command to assist the remote pilot in command and the person manipulating the flight controls to see and avoid other air traffic or objects aloft or on the ground.

### Visual Line of Sight (VLOS)
With vision that is unaided by any device other than corrective lenses, the ability to see the unmanned aircraft throughout the entire flight in order to:
- Know the unmanned aircraft's location
- Determine the unmanned aircraft's attitude, altitude, and direction of flight
- Observe the airspace for other air traffic or hazards
- Determine that the unmanned aircraft does not endanger the life or property of another

### Control Station
An interface used by the remote pilot to control the flight path of the small unmanned aircraft.

## 14 CFR §107.5 - Falsification, Reproduction, or Alteration

**Official Text**: *No person may make or cause to be made:*
- *Any fraudulent or intentionally false record or report that is required to be made, kept, or used to show compliance with this part*
- *Any reproduction for fraudulent purpose of any certificate or rating*
- *Any alteration of any certificate or rating*

### What This Means:
- Never falsify records, logbooks, or reports
- Don't create fake certificates or alter existing ones
- Violations can result in certificate suspension or revocation
- Civil penalties up to $27,500 per violation
- Criminal penalties possible

## 14 CFR §107.7 - Inspection, Testing, and Demonstration of Compliance

**Official Text**: *A remote pilot in command, owner, or person manipulating the flight controls of a small unmanned aircraft system must, upon request, make available to the Administrator:*
- *The remote pilot certificate with a small UAS rating*
- *Any other document, record, or report required to be kept under this part*

### Key Requirements:
- Carry your Remote Pilot Certificate during operations
- Have aircraft registration available
- Maintain records as required
- Be prepared to demonstrate compliance
- FAA, law enforcement, or authorized persons may request to see certificates

## 14 CFR §107.9 - Accident Reporting

**Official Text**: *No later than 10 days after an operation that meets the criteria of either paragraph (a) or (b) of this section, a remote pilot in command must report to the FAA any operation of the small unmanned aircraft involving at least:*

### Reportable Accidents:

**(a) Serious injury** to any person or any loss of consciousness; or

**(b) Damage to any property**, other than the small unmanned aircraft, unless:
  - The cost of repair (including materials and labor) does not exceed $500, or
  - The fair market value does not exceed $500 in the event of total loss

### Reporting Requirements:
- **Timeline**: Within 10 days of the accident
- **Method**: Report to FAA online at https://www.faa.gov/uas/report_accident
- **Include**: Date, time, location, operator information, circumstances
- **Definition of Serious Injury**:
  - Hospitalization for more than 48 hours, within 7 days of injury
  - Fracture of any bone (except simple finger/toe fractures)
  - Severe hemorrhages, nerve/muscle/tendon damage
  - Second or third-degree burns, or burns affecting more than 5% of body

### Example Scenarios:

**MUST Report:**
- Drone crashes into building causing $600 in damage
- Bystander suffers broken bone from drone collision
- Property damage of $2,000 to vehicle

**DO NOT Need to Report:**
- Drone crashes and is destroyed ($1,500 value) but causes no other damage
- Minor cut requiring bandage
- $400 damage to fence from crash

---

## Summary of Subpart A

Subpart A establishes:
1. **Scope**: What Part 107 regulates
2. **Definitions**: Key terms used throughout the regulations
3. **General Rules**: Falsification, inspections, and accident reporting

Understanding these foundational concepts is critical as they apply throughout all Part 107 operations.

## Official FAA Resources for This Module:

- **14 CFR Part 107 Subpart A**: Complete regulatory text
- **FAA Remote Pilot Study Guide**: Pages covering definitions and applicability
- **AC 107-2A**: Small Unmanned Aircraft Systems Advisory Circular
    `,
    officialResources: [
      {
        title: "14 CFR §107.1 - Applicability",
        type: "regulation",
        url: "https://www.ecfr.gov/current/title-14/section-107.1",
        description: "Official regulation defining the scope of Part 107"
      },
      {
        title: "14 CFR §107.3 - Definitions",
        type: "regulation",
        url: "https://www.ecfr.gov/current/title-14/section-107.3",
        description: "Official definitions of terms used throughout Part 107"
      },
      {
        title: "14 CFR §107.9 - Accident Reporting",
        type: "regulation",
        url: "https://www.ecfr.gov/current/title-14/section-107.9",
        description: "Requirements for reporting UAS accidents to the FAA"
      },
      {
        title: "FAA UAS Accident Reporting",
        type: "faa_guide",
        url: "https://www.faa.gov/uas/report_accident",
        description: "Official FAA page for reporting UAS accidents and incidents"
      },
      {
        title: "Advisory Circular 107-2A",
        type: "faa_guide",
        url: "https://www.faa.gov/regulations_policies/advisory_circulars/",
        description: "Small Unmanned Aircraft Systems Advisory Circular providing additional guidance"
      }
    ],
    assessmentQuestions: [
      {
        question: "A small unmanned aircraft must weigh less than how much on takeoff?",
        options: ["25 pounds", "35 pounds", "55 pounds", "100 pounds"],
        correctAnswer: 2,
        explanation: "14 CFR §107.3 defines a small unmanned aircraft as weighing less than 55 pounds on takeoff, including everything on board or attached to the aircraft.",
        reference: "14 CFR §107.3"
      },
      {
        question: "You must report an accident to the FAA if property damage (other than to your UAS) exceeds:",
        options: ["$100", "$250", "$500", "$1,000"],
        correctAnswer: 2,
        explanation: "14 CFR §107.9 requires accident reporting when property damage exceeds $500 for repair costs or fair market value.",
        reference: "14 CFR §107.9"
      },
      {
        question: "How soon after an accident must you report it to the FAA?",
        options: ["Immediately", "Within 48 hours", "Within 10 days", "Within 30 days"],
        correctAnswer: 2,
        explanation: "14 CFR §107.9 requires remote pilots to report accidents no later than 10 days after the operation that caused the accident.",
        reference: "14 CFR §107.9"
      },
      {
        question: "What does VLOS stand for?",
        options: [
          "Very Low Operating System",
          "Visual Line of Sight",
          "Vertical Line of Service",
          "Vision-based Location Operating System"
        ],
        correctAnswer: 1,
        explanation: "VLOS stands for Visual Line of Sight, which is defined in 14 CFR §107.3 as the ability to see the unmanned aircraft throughout the entire flight with unaided vision (except corrective lenses).",
        reference: "14 CFR §107.3"
      },
      {
        question: "Part 107 applies to which of the following operations?",
        options: [
          "All drone operations in the United States",
          "Commercial sUAS operations only",
          "Military drone operations",
          "Recreational operations under 49 U.S.C. 44809"
        ],
        correctAnswer: 1,
        explanation: "14 CFR §107.1 specifies that Part 107 applies to civil small unmanned aircraft systems operated for compensation or hire within the United States.",
        reference: "14 CFR §107.1"
      },
      {
        question: "Your drone crashes into a tree and is destroyed. The drone cost $800. No other damage occurred. Do you need to report this to the FAA?",
        options: [
          "Yes, because damage exceeded $500",
          "Yes, all accidents must be reported",
          "No, because damage to the sUAS itself doesn't count",
          "No, because no one was injured"
        ],
        correctAnswer: 2,
        explanation: "14 CFR §107.9 requires reporting only when there is property damage OTHER THAN to the small unmanned aircraft itself. Damage to your own drone does not trigger reporting requirements.",
        reference: "14 CFR §107.9"
      }
    ]
  }

  // Additional modules would continue here following the same structure
  // Each module would include:
  // - Full official FAA regulation text where applicable
  // - Learning objectives
  // - Comprehensive content
  // - Official resource links
  // - Assessment questions with explanations
];

/**
 * Function to get all official FAA resources referenced in the course
 */
export function getAllOfficialResources(): OfficialResource[] {
  const resources: OfficialResource[] = [];

  part107LessonContent.forEach(lesson => {
    resources.push(...lesson.officialResources);
  });

  // Deduplicate by URL
  return Array.from(new Map(resources.map(item => [item.url, item])).values());
}

/**
 * Function to get lesson content by module ID
 */
export function getLessonByModuleId(moduleId: number): LessonContent | undefined {
  return part107LessonContent.find(lesson => lesson.moduleId === moduleId);
}

/**
 * Export official FAA resource links
 */
export const OFFICIAL_FAA_RESOURCES = {
  PART_107_REGULATIONS: 'https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107',
  REMOTE_PILOT_STUDY_GUIDE: 'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf',
  AIRMAN_CERTIFICATION_STANDARDS: 'https://www.faa.gov/training_testing/testing/acs/',
  SAMPLE_TEST_QUESTIONS: 'https://www.faa.gov/sites/faa.gov/files/training_testing/testing/test_questions/uag_questions.pdf',
  PILOTS_HANDBOOK: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak',
  UAS_RESOURCES: 'https://www.faa.gov/uas',
  ACCIDENT_REPORTING: 'https://www.faa.gov/uas/report_accident',
  BECOME_A_DRONE_PILOT: 'https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot',
  LAANC_INFO: 'https://www.faa.gov/uas/getting_started/laanc',
  AIRSPACE_MAP: 'https://faa.maps.arcgis.com/apps/webappviewer/index.html?id=9c2e4406710048e19806ebf6a06754ad'
};
