-- Add content_data column to course_modules for storing rich content
ALTER TABLE course_modules
  ADD COLUMN IF NOT EXISTS content_data JSONB DEFAULT '{}'::jsonb;

-- Add comprehensive content to Module 1: Introduction to Drone Regulations
UPDATE course_modules SET content_data = '{
  "sections": [
    {
      "type": "text",
      "title": "Welcome to FAA Part 107 Certification",
      "content": "Welcome to The Boston Drone School''s comprehensive FAA Part 107 Remote Pilot Certification course. This course will prepare you to successfully pass the FAA knowledge test and become a certified commercial drone pilot.\n\nThe FAA Part 107 regulations govern the operation of small unmanned aircraft systems (sUAS) for commercial purposes in the United States. As a remote pilot, you''ll need to understand these regulations thoroughly to operate safely and legally."
    },
    {
      "type": "text",
      "title": "What is Part 107?",
      "content": "Part 107, also known as the Small UAS Rule, was enacted by the FAA on August 29, 2016. It established regulations for the commercial use of small drones (under 55 pounds). Key highlights include:\n\n• Aircraft must weigh less than 55 lbs (25 kg) including payload\n• Operations limited to daylight and civil twilight\n• Maximum altitude of 400 feet above ground level\n• Maximum speed of 100 mph (87 knots)\n• Remote pilot must maintain visual line of sight\n• No operations over people (unless they''re directly participating)\n• Remote pilot certificate required"
    },
    {
      "type": "text",
      "title": "Who Needs Part 107 Certification?",
      "content": "You need a Part 107 Remote Pilot Certificate if you are operating a drone:\n\n• For commercial purposes (getting paid)\n• For business operations\n• For real estate photography\n• For inspections or surveys\n• For agricultural monitoring\n• For any non-recreational purpose\n\nRecreational drone operations fall under 44809 (formerly Section 336), which has different requirements."
    },
    {
      "type": "video",
      "title": "Introduction Video",
      "videoUrl": "https://www.youtube.com/embed/U2VkyD7j3Ok",
      "description": "FAA Part 107 Overview and Requirements"
    },
    {
      "type": "quiz",
      "title": "Module 1 Knowledge Check",
      "questions": [
        {
          "question": "What is the maximum altitude allowed under Part 107?",
          "options": ["400 feet AGL", "500 feet AGL", "1000 feet MSL", "No limit"],
          "correctAnswer": 0,
          "explanation": "Part 107 limits operations to 400 feet above ground level (AGL) unless flying within 400 feet of a structure."
        },
        {
          "question": "Can you fly your drone commercially without a Part 107 certificate?",
          "options": ["Yes, if under 55 lbs", "No, certification is required", "Yes, if recreational", "Only with a waiver"],
          "correctAnswer": 1,
          "explanation": "A Part 107 Remote Pilot Certificate is required for any commercial drone operation in the United States."
        },
        {
          "question": "What is the maximum speed allowed under Part 107?",
          "options": ["50 mph", "87 knots", "100 mph", "Both B and C"],
          "correctAnswer": 3,
          "explanation": "The maximum speed is 100 mph (87 knots). Both values are correct and refer to the same limit."
        }
      ]
    }
  ]
}'::jsonb WHERE id = 1;

-- Add content to Module 2: Airspace Classifications
UPDATE course_modules SET content_data = '{
  "sections": [
    {
      "type": "text",
      "title": "Understanding Airspace",
      "content": "Airspace classification is one of the most important topics on the Part 107 exam. The National Airspace System (NAS) is divided into different classes, each with specific requirements and restrictions.\n\nAs a remote pilot, you must understand:\n• What airspace you''re operating in\n• Whether you need authorization\n• What restrictions apply\n• How to obtain authorization when needed"
    },
    {
      "type": "text",
      "title": "Class A Airspace",
      "content": "Class A airspace extends from 18,000 feet MSL up to FL600 (60,000 feet).\n\nKey Points:\n• Generally not accessible to sUAS operations\n• Requires special authorization\n• Primarily used by commercial aircraft\n• You will NOT operate drones in Class A airspace under normal Part 107 operations"
    },
    {
      "type": "text",
      "title": "Class B Airspace",
      "content": "Class B airspace surrounds the busiest airports (like Boston Logan, LAX, JFK).\n\nCharacteristics:\n• Shaped like an upside-down wedding cake\n• Surface area to 10,000 feet MSL typically\n• Requires ATC authorization via LAANC\n• Mode C veil extends 30 nm from primary airport\n\nExample: Boston Logan International Airport has Class B airspace that drone pilots must be aware of when operating in the Boston area."
    },
    {
      "type": "text",
      "title": "Class C, D, and E Airspace",
      "content": "Class C: Moderately busy airports\n• Surface to 4,000 feet AGL typically\n• Requires ATC authorization\n\nClass D: Airports with control towers\n• Surface to 2,500 feet AGL typically\n• Requires ATC authorization\n\nClass E: Controlled airspace not A, B, C, or D\n• Starts at various altitudes\n• Generally starts at 700 or 1,200 feet AGL\n• May require authorization depending on altitude"
    },
    {
      "type": "text",
      "title": "Class G Airspace",
      "content": "Class G is uncontrolled airspace.\n\nKey Points:\n• No ATC authorization required\n• Still subject to Part 107 regulations\n• Exists below Class E airspace\n• Most common for drone operations\n\nRemember: Just because you don''t need authorization doesn''t mean there are no rules!"
    },
    {
      "type": "quiz",
      "title": "Airspace Knowledge Check",
      "questions": [
        {
          "question": "Which airspace requires ATC authorization for drone operations?",
          "options": ["Class G only", "Class B, C, D, and E (in some cases)", "All airspace", "None"],
          "correctAnswer": 1,
          "explanation": "Class B, C, D, and some Class E airspace require ATC authorization. Class G does not."
        },
        {
          "question": "What does LAANC stand for?",
          "options": ["Local Air Authorization Navigation Center", "Low Altitude Authorization and Notification Capability", "Legal Airspace Access Network Control", "Limited Area Aircraft Navigation Clearance"],
          "correctAnswer": 1,
          "explanation": "LAANC is the Low Altitude Authorization and Notification Capability, an automated system for obtaining airspace authorizations."
        }
      ]
    }
  ]
}'::jsonb WHERE id = 2;

-- Add content to Module 3: Weather Fundamentals
UPDATE course_modules SET content_data = '{
  "sections": [
    {
      "type": "text",
      "title": "Why Weather Matters for Drone Operations",
      "content": "Weather is a critical factor in safe drone operations. As a remote pilot, you must:\n\n• Understand weather patterns\n• Interpret weather reports (METARs and TAFs)\n• Recognize hazardous conditions\n• Know when NOT to fly\n\nApproximately 25% of the Part 107 exam covers weather-related topics."
    },
    {
      "type": "text",
      "title": "Wind and Drone Operations",
      "content": "Wind is one of the most important weather factors for drone pilots.\n\nKey Concepts:\n• Surface wind vs. wind aloft\n• Wind speed and direction\n• Gusts and turbulence\n• Crosswinds during takeoff/landing\n\nRule of Thumb: Most consumer drones should not be flown in winds exceeding 20 knots (23 mph). Always check your specific drone''s wind resistance specifications.\n\nWind increases with altitude, so conditions at 400 feet AGL may be significantly different than at the surface."
    },
    {
      "type": "text",
      "title": "Visibility and Cloud Clearance",
      "content": "Part 107 requires:\n• Minimum visibility of 3 statute miles from control station\n• Remain clear of clouds\n\nWhy? You must maintain visual line of sight with your aircraft at all times.\n\nFog, haze, precipitation, and smoke can all reduce visibility below legal minimums."
    },
    {
      "type": "text",
      "title": "Reading a METAR",
      "content": "METAR is a routine aviation weather report.\n\nExample METAR:\nKBOS 121754Z 09014G25KT 10SM FEW040 BKN250 23/14 A2990\n\nDecoded:\n• KBOS: Boston Logan International Airport\n• 121754Z: 12th day, 17:54 UTC (Zulu time)\n• 09014G25KT: Wind from 090° at 14 knots, gusting to 25 knots\n• 10SM: Visibility 10 statute miles\n• FEW040 BKN250: Few clouds at 4,000 ft, broken at 25,000 ft\n• 23/14: Temperature 23°C, Dewpoint 14°C\n• A2990: Altimeter setting 29.90 inches Hg\n\nThis is good flying weather for drones (though the gusts might be a concern)."
    },
    {
      "type": "text",
      "title": "Hazardous Weather Conditions",
      "content": "Never fly in:\n• Thunderstorms or lightning\n• Heavy precipitation\n• Icing conditions\n• Dense fog\n• High winds (exceeding your drone''s specifications)\n\nOther considerations:\n• Temperature extremes affect battery performance\n• Low dewpoint spread indicates fog potential\n• Rapidly changing conditions require constant monitoring"
    },
    {
      "type": "quiz",
      "title": "Weather Knowledge Check",
      "questions": [
        {
          "question": "What is the minimum visibility required for Part 107 operations?",
          "options": ["1 statute mile", "3 statute miles", "5 statute miles", "No minimum"],
          "correctAnswer": 1,
          "explanation": "Part 107 requires a minimum visibility of 3 statute miles from the control station."
        },
        {
          "question": "In a METAR, what does ''G'' indicate in the wind component?",
          "options": ["Ground wind", "Gusts", "Gradient", "General direction"],
          "correctAnswer": 1,
          "explanation": "G indicates gusts, showing the maximum wind speed variation."
        }
      ]
    }
  ]
}'::jsonb WHERE id = 3;

-- Add content to Module 4: Safety Protocols
UPDATE course_modules SET content_data = '{
  "sections": [
    {
      "type": "text",
      "title": "Safety First: Your Responsibility as Remote PIC",
      "content": "As a remote Pilot in Command (PIC), safety is your primary responsibility.\n\nKey Principles:\n• You are responsible for the safe operation of your sUAS\n• You must assess risks before every flight\n• You have the authority to deviate from regulations in an emergency\n• You must report accidents and incidents to the FAA\n\nThe FAA''s number one priority is safety. This should be your priority too."
    },
    {
      "type": "text",
      "title": "Pre-Flight Inspection",
      "content": "Before EVERY flight, you must conduct a thorough pre-flight inspection.\n\nChecklist:\n□ Visual inspection of aircraft for damage\n□ Check all propellers for cracks or damage\n□ Verify battery charge level and condition\n□ Test control surfaces and motors\n□ Verify GPS signal and satellite lock\n□ Check weather conditions\n□ Verify airspace authorization (if required)\n□ Inspect control station (remote controller)\n□ Ensure emergency procedures are planned\n□ Verify all required documentation is available"
    },
    {
      "type": "text",
      "title": "Crew Resource Management (CRM)",
      "content": "CRM is about effective use of all available resources: people, equipment, and information.\n\nBest Practices:\n• Use a visual observer when beneficial\n• Communicate clearly with your crew\n• Establish roles and responsibilities before flight\n• Encourage crew members to speak up about safety concerns\n• Brief crew on emergency procedures\n\nEven when flying solo, CRM principles apply to your decision-making process."
    },
    {
      "type": "text",
      "title": "Emergency Procedures",
      "content": "Know what to do when things go wrong:\n\nLost Link:\n• Most drones have automatic return-to-home\n• Know your drone''s failsafe settings\n• Have a backup plan\n\nLow Battery:\n• Set conservative battery warnings\n• Return before reaching critical levels\n• Account for headwinds on return flight\n\nFlyaway:\n• Switch to manual mode if possible\n• Note last known location\n• Report to FAA if lost\n\nCrash/Accident:\n• Secure the area\n• Check for injuries\n• Document the incident\n• Report to FAA if required"
    },
    {
      "type": "text",
      "title": "Accident Reporting Requirements",
      "content": "You MUST report to the FAA within 10 days if:\n\n• Serious injury to any person (hospitalization > 48 hours within 7 days)\n• Loss of consciousness\n• Property damage exceeding $500 (other than the sUAS itself)\n\nReport using the FAA''s online reporting system.\n\nFailure to report can result in certificate suspension or revocation."
    },
    {
      "type": "quiz",
      "title": "Safety Knowledge Check",
      "questions": [
        {
          "question": "When must you report an sUAS accident to the FAA?",
          "options": ["Any damage to the drone", "Serious injury or property damage >$500", "Only if someone dies", "Never"],
          "correctAnswer": 1,
          "explanation": "Accidents must be reported if they result in serious injury or property damage exceeding $500 (excluding the sUAS itself)."
        },
        {
          "question": "Who is responsible for the safe operation of an sUAS during a flight?",
          "options": ["The visual observer", "The person who owns the drone", "The remote Pilot in Command", "The FAA"],
          "correctAnswer": 2,
          "explanation": "The remote Pilot in Command (PIC) is always responsible for the safe operation of the sUAS."
        },
        {
          "question": "How long do you have to report an accident to the FAA?",
          "options": ["24 hours", "48 hours", "10 days", "30 days"],
          "correctAnswer": 2,
          "explanation": "Accidents meeting the reporting criteria must be reported to the FAA within 10 days."
        }
      ]
    }
  ]
}'::jsonb WHERE id = 4;

-- Create indexes for better query performance on JSON data
CREATE INDEX IF NOT EXISTS idx_course_modules_content ON course_modules USING gin(content_data);
