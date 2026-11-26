export type OptionLetter = 'A' | 'B' | 'C' | 'D';

export interface QuestionOption {
  letter: OptionLetter;
  text: string;
}

export interface QuestQuestion {
  id: number;
  title: string;
  prompt: string;
  options: QuestionOption[];
  correctAnswers: OptionLetter[];
  requiredSelections: 1 | 2;
  explanation: string;
  incorrectFeedback: Partial<Record<OptionLetter, string>>;
}

export interface AchievementBadge {
  xpRequired: number;
  title: string;
  subtitle: string;
  colorClass: string;
}

export const QUEST_QUESTIONS: QuestQuestion[] = [
  {
    id: 1,
    title: "Celebrating Others' Success",
    prompt:
      "Your friend wins first prize in a competition, but you do not win anything. What is the BEST way to show appreciation?",
    options: [
      { letter: 'A', text: 'Congratulate your friend sincerely.' },
      { letter: 'B', text: 'Avoid talking to your friend.' },
      { letter: 'C', text: 'Tell others the prize was undeserved.' },
      { letter: 'D', text: 'Stop joining future competitions.' },
    ],
    correctAnswers: ['A'],
    requiredSelections: 1,
    explanation:
      "Congratulating your friend shows that you are happy for another person's success. Appreciating others means celebrating their achievements without feeling jealous.",
    incorrectFeedback: {
      B: 'Avoiding your friend does not demonstrate appreciation.',
      C: "This puts down your friend's achievement instead of appreciating it.",
      D: "Giving up does not show appreciation for another person's success.",
    },
  },
  {
    id: 2,
    title: 'Respecting Cultural Differences',
    prompt:
      'A new student from a different cultural background joins your class. Which action BEST demonstrates appreciation?',
    options: [
      { letter: 'A', text: 'Ask the student to change their habits.' },
      {
        letter: 'B',
        text: 'Invite the student to join activities and learn about their culture.',
      },
      { letter: 'C', text: 'Avoid the student because of differences.' },
      { letter: 'D', text: "Make jokes about the student's culture." },
    ],
    correctAnswers: ['B'],
    requiredSelections: 1,
    explanation:
      'Inviting the student to participate shows inclusion, curiosity and respect for cultural differences.',
    incorrectFeedback: {
      A: 'This does not respect cultural differences.',
      C: 'Avoiding someone based on differences is not appreciation.',
      D: "Making fun of someone's culture is disrespectful.",
    },
  },
  {
    id: 3,
    title: 'Appreciating School Cleaners',
    prompt:
      'Your school cleaner works hard to keep the school clean. Which TWO actions show appreciation?',
    options: [
      { letter: 'A', text: 'Thank the cleaner for keeping the school clean.' },
      { letter: 'B', text: 'Throw rubbish on the floor.' },
      { letter: 'C', text: 'Keep the classroom clean and tidy.' },
      { letter: 'D', text: 'Ignore the cleaner at all times.' },
    ],
    correctAnswers: ['A', 'C'],
    requiredSelections: 2,
    explanation:
      "A sincere thank-you recognises the cleaner's effort. Keeping the classroom clean also shows responsibility and respect for the cleaner's work.",
    incorrectFeedback: {
      B: 'This creates extra work and shows disrespect.',
      D: 'Ignoring someone does not communicate appreciation.',
    },
  },
  {
    id: 4,
    title: 'Appreciating People with Different Abilities',
    prompt:
      'Your classmate has a physical disability and needs more time to complete a group task. What should you do?',
    options: [
      { letter: 'A', text: 'Complete everything without involving them.' },
      { letter: 'B', text: 'Ask them to leave the group.' },
      {
        letter: 'C',
        text: 'Give them a suitable role and support their participation.',
      },
      { letter: 'D', text: 'Laugh at their slower progress.' },
    ],
    correctAnswers: ['C'],
    requiredSelections: 1,
    explanation:
      'Everyone deserves an opportunity to participate. Giving the student a suitable role promotes inclusion, dignity and equal participation.',
    incorrectFeedback: {
      A: "This removes the classmate's opportunity to participate.",
      B: 'Excluding someone because of a disability is unfair.',
      D: 'Laughing at someone is hurtful and disrespectful.',
    },
  },
  {
    id: 5,
    title: 'Understanding True Appreciation',
    prompt:
      'We should appreciate others only when they give us gifts or rewards.',
    options: [
      { letter: 'A', text: 'True.' },
      { letter: 'B', text: 'False.' },
    ],
    correctAnswers: ['B'],
    requiredSelections: 1,
    explanation:
      'Appreciation should be sincere. We should recognise kindness, effort and contributions even when we receive nothing in return.',
    incorrectFeedback: {
      A: 'Appreciation does not depend on receiving gifts or rewards.',
    },
  },
  {
    id: 6,
    title: 'Respecting Different Opinions',
    prompt:
      'During a group discussion, one student gives an idea that is different from yours. What is the most respectful response?',
    options: [
      { letter: 'A', text: 'Reject the idea immediately.' },
      { letter: 'B', text: 'Listen carefully and consider the suggestion.' },
      { letter: 'C', text: 'Tell everyone that your idea is always better.' },
      { letter: 'D', text: 'Ask the student to remain silent.' },
    ],
    correctAnswers: ['B'],
    requiredSelections: 1,
    explanation:
      "Listening shows respect for another person's thoughts and opinions. Everyone deserves a chance to express their ideas.",
    incorrectFeedback: {
      A: 'Rejecting an idea without listening prevents fair discussion.',
      C: 'This shows arrogance rather than appreciation.',
      D: 'Preventing someone from sharing ideas is disrespectful.',
    },
  },
  {
    id: 7,
    title: 'Appreciating Quiet Acts of Kindness',
    prompt:
      'A person who helps others quietly without expecting praise still deserves appreciation.',
    options: [
      { letter: 'A', text: 'True.' },
      { letter: 'B', text: 'False.' },
    ],
    correctAnswers: ['A'],
    requiredSelections: 1,
    explanation:
      'Helpful actions have value even when the person does not seek public recognition. We should appreciate kindness whether it is done publicly or privately.',
    incorrectFeedback: {
      B: 'People deserve appreciation for sincere kindness even when they receive no attention.',
    },
  },
  {
    id: 8,
    title: 'Taking Responsibility',
    prompt:
      "You accidentally damage your friend's favourite book. Which response BEST demonstrates respect and appreciation for your friendship?",
    options: [
      { letter: 'A', text: 'Hide the damaged book.' },
      { letter: 'B', text: 'Blame another classmate.' },
      { letter: 'C', text: 'Apologise honestly and offer to replace it.' },
      { letter: 'D', text: 'Pretend nothing happened.' },
    ],
    correctAnswers: ['C'],
    requiredSelections: 1,
    explanation:
      "Taking responsibility shows honesty and respect for your friend's belongings. A sincere apology helps maintain trust and friendship.",
    incorrectFeedback: {
      A: 'Hiding the damage avoids responsibility and may damage trust.',
      B: 'Blaming someone else is dishonest and unfair.',
      D: 'Ignoring the problem does not show consideration.',
    },
  },
  {
    id: 9,
    title: 'Appreciating Community Helpers',
    prompt:
      'Why is it important to appreciate people who work behind the scenes, such as security guards and cleaners?',
    options: [
      { letter: 'A', text: 'They only work for their own benefit.' },
      { letter: 'B', text: 'Their contributions help the school function smoothly.' },
      { letter: 'C', text: 'They are more important than every other worker.' },
      { letter: 'D', text: 'They expect expensive gifts from students.' },
    ],
    correctAnswers: ['B'],
    requiredSelections: 1,
    explanation:
      "Their efforts contribute to a safe, clean and organised school environment. Every person's contribution deserves recognition.",
    incorrectFeedback: {
      A: 'Their work also supports the safety and comfort of the school community.',
      C: 'Appreciation does not require ranking people against one another.',
      D: 'Appreciation does not depend on giving expensive presents.',
    },
  },
  {
    id: 10,
    title: 'Becoming a Superhero Leader',
    prompt:
      'You are the class monitor. Some students are often left out of classroom activities. Which TWO actions would help create a more appreciative classroom?',
    options: [
      {
        letter: 'A',
        text: 'Encourage everyone to participate in group activities.',
      },
      { letter: 'B', text: 'Allow only popular students to lead activities.' },
      { letter: 'C', text: "Recognise everyone's efforts and contributions." },
      { letter: 'D', text: 'Ignore students who are less confident.' },
    ],
    correctAnswers: ['A', 'C'],
    requiredSelections: 2,
    explanation:
      'Involving everyone promotes belonging and equal participation. Recognising different contributions helps every student feel valued and appreciated.',
    incorrectFeedback: {
      B: 'This creates unfair opportunities and excludes others.',
      D: 'Ignoring them increases exclusion rather than building appreciation.',
    },
  },
];

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    xpRequired: 200,
    title: 'Kindness Rookie',
    subtitle: 'First steps as a superhero of gratitude',
    colorClass: 'bg-sky-400 text-slate-950',
  },
  {
    xpRequired: 400,
    title: 'Gratitude Hero',
    subtitle: 'Spreading kindness across the school',
    colorClass: 'bg-violet-500 text-white',
  },
  {
    xpRequired: 700,
    title: 'Superhero of Respect',
    subtitle: 'Championing inclusion and empathy',
    colorClass: 'bg-blue-600 text-white',
  },
  {
    xpRequired: 1000,
    title: 'Ultimate Gratitude Champion',
    subtitle: 'Master of appreciation and kindness',
    colorClass: 'bg-amber-400 text-slate-950',
  },
];

export const CORRECT_MESSAGES: string[] = [
  'SUPER JOB, HERO! You nailed it!',
  "MEOW-GNIFICENT! That's the right answer!",
  'POW! Your kindness knowledge is SUPER!',
  "AMAZING WORK! You're making the world a better place!",
  'Ameowzing is cheering for you!',
  'BOOM! Another heroic decision!',
];

export const ENCOURAGEMENT_MESSAGES: string[] = [
  "Oops! Even superheroes make mistakes. Let's learn together!",
  "That's okay, young hero! Every mistake makes you stronger.",
  "Not quite! Let's discover why another answer is better.",
  "Don't give up! Ameowzing believes in you!",
];

export function getHighestBadge(xp: number): AchievementBadge | null {
  let highest: AchievementBadge | null = null;
  for (const badge of ACHIEVEMENT_BADGES) {
    if (xp >= badge.xpRequired) {
      highest = badge;
    }
  }
  return highest;
}

export function getPerformanceMessage(xp: number): string {
  if (xp >= 900) {
    return 'INCREDIBLE! You are the Ultimate Gratitude Champion! Ameowzing is so proud of you!';
  }
  if (xp >= 700) {
    return 'SUPERHERO STATUS UNLOCKED! You are a true Superhero of Respect!';
  }
  if (xp >= 400) {
    return 'AMAZING EFFORT! You are becoming a Gratitude Hero!';
  }
  if (xp >= 200) {
    return 'GOOD JOB, YOUNG HERO! Keep practising kindness and appreciation!';
  }
  return 'Every superhero starts somewhere! Ameowzing believes in you. Keep learning and trying!';
}
