import { DeathCause } from './types';

export interface RoastResult {
  message: string;
  subtext?: string;
  tag: string;
}

const ROAST_DICTIONARY: Record<DeathCause, string[]> = {
  spike: [
    "The spikes are getting tired of meeting you.",
    "You jumped directly into the problem.",
    "Those pointy triangles aren't birthday party hats.",
    "Did you think closing your eyes makes spikes soft?",
    "Gravity 1, You 0. Spikes: Assist of the year.",
    "The spikes sent a thank-you letter for your loyalty.",
    "You touched the forbidden acupuncture mat.",
    "Have you considered jumping OVER them next time?",
    "Spike safety inspection complete: 100% sharp.",
  ],
  pit_fall: [
    "The floor was just a suggestion anyway.",
    "Next time, try landing on the solid parts of the level.",
    "That wasn't flying. That wasn't even falling with style.",
    "Legend has it you are still falling.",
    "The void says hello. It thinks you're nice.",
    "You inspected the bottom of the pit with extreme dedication.",
    "Newtonian physics strikes again without remorse.",
    "Did you think there was a trampoline down there?",
  ],
  fake_treasure: [
    "Loot goblin detected.",
    "The shiny gold was a lie, and you fell for it instantly.",
    "Greed is not good. Greed is a bottomless pit.",
    "You saw shiny pixels and your brain completely turned off.",
    "Opening random boxes in dungeons: A proven life strategy.",
    "Congratulations! You unlocked: Immediate Regret.",
    "The chest was empty, but the trap was full of hospitality.",
  ],
  lying_checkpoint: [
    "Checkpoint? More like disappointment point.",
    "That flag had commitment issues and ran away.",
    "You celebrated early. That is always a mistake.",
    "The flag said 'Nope' and vacated the premises.",
    "Trusting a brightly colored cloth in a troll game? Rookie.",
    "It gave you hope, then took away your dignity.",
    "The checkpoint filed a restraining order against you.",
  ],
  betrayal_jump: [
    "You trusted the tutorial. That's on you.",
    "Identical twins: One is a platform, one is a crime scene.",
    "Looked safe. Felt safe. Wasn't safe.",
    "The architect was having a bad day when designing this jump.",
    "Fool me once, shame on you. Jump again, shame on me.",
    "Platform aesthetics are very deceiving.",
  ],
  fake_exit: [
    "You were so close. Emotionally.",
    "Premature celebration detected! Confetti retracted.",
    "The exit door was painted on the wall like a cartoon.",
    "Almost a champion. Unfortunately, 'almost' doesn't count.",
    "The developer is laughing from behind a one-way mirror.",
    "You smelled the victory, but stepped in the puddle.",
    "Real finish line is currently rescheduling.",
  ],
  suspicious_cloud: [
    "Weather conditions: betrayal.",
    "Clouds are made of water vapor. Why did you stand on it?",
    "The cloud evacuated when it felt your weight.",
    "0% chance of rain, 100% chance of emotional damage.",
    "Cloud storage failed to synchronize your landing.",
  ],
  overpowered_spring: [
    "Maximum performance. Minimum survival.",
    "Launched into orbit without clearance from air traffic control.",
    "You asked for a boost, the spring gave you a catastrophe.",
    "That spring was sponsored by the spike industry.",
    "To infinity and... directly into the ceiling.",
  ],
  reverse_psychology: [
    "You really can't follow instructions.",
    "The sign explicitly warned you. Or did it?",
    "Reverse psychology 101: You failed the midterm exam.",
    "Signs are written by people who enjoy your suffering.",
    "Reading comprehension: Questionable.",
  ],
  memory_test: [
    "Didn't we discuss this?",
    "Cracks usually mean 'do not stand here a second time'.",
    "Short-term memory test: Needs improvement.",
    "The floor gave you fair warning. You ignored it.",
    "Step one: Good. Step two: Funeral.",
  ],
  fake_safe_zone: [
    "There is no sanctuary in this house.",
    "Comfort is an illusion. Especially in Level 10.",
    "You took a deep breath, and the ceiling noticed.",
    "Rest stops are strictly prohibited by developer ordinance.",
  ],
  last_second_trap: [
    "One millimeter from glory.",
    "The finish line door politely declined your presence.",
    "Never celebrate until your feet are on the podium.",
    "Tripped at the 99-yard line. Spectacular.",
  ],
  falling_block: [
    "Look up! Oh wait, too late.",
    "Heads up! Specifically, protect your head.",
    "A wild crushing hazard appeared!",
  ],
  general: [
    "Skill issue? Or architectural issue?",
    "Your confidence was truly impressive.",
    "The developer is taking notes on your techniques.",
    "Almost a professional. Almost.",
    "Thank you for thoroughly testing this trap.",
    "That looked painful, even in 2D pixels.",
    "A valiant effort with a tragic conclusion.",
    "Don't worry, nobody saw that (except the death counter).",
  ],
};

const STREAK_ROASTS = [
  "This exact spot has claimed you 3 times now.",
  "Are you conducting a scientific study on this specific obstacle?",
  "The definition of insanity is doing the exact same jump again.",
  "At this rate, we should name this trap after you.",
  "Have you considered trying literally any other direction?",
];

const SPEED_ROASTS = [
  "Speedrunning directly into the danger zone.",
  "Running fast only gets you to the grave quicker.",
  "Patience is a virtue you clearly do not possess.",
];

const IDLE_ROASTS = [
  "Overthinking: Fatal since level one.",
  "You hesitated, and hesitation has a 100% failure rate.",
  "The timer kept running while you were soul-searching.",
];

// Memory cache to avoid repeats
const recentRoasts: string[] = [];

export function getContextAwareRoast(params: {
  cause: DeathCause;
  sameSpotCount: number;
  runDurationSeconds: number;
  totalDeaths: number;
  levelNumber: number;
}): RoastResult {
  const { cause, sameSpotCount, runDurationSeconds, totalDeaths, levelNumber } = params;

  let candidatePool: string[] = [];
  let tag = "NICE TRY!";

  if (sameSpotCount >= 3) {
    candidatePool = STREAK_ROASTS;
    tag = `TRAP NEMESIS (x${sameSpotCount})`;
  } else if (runDurationSeconds < 2.0 && cause !== 'pit_fall') {
    candidatePool = SPEED_ROASTS;
    tag = "SPEEDY MISTAKE";
  } else if (runDurationSeconds > 45.0) {
    candidatePool = IDLE_ROASTS;
    tag = "OVERTHINKING";
  } else {
    candidatePool = ROAST_DICTIONARY[cause] || ROAST_DICTIONARY.general;
    switch (cause) {
      case 'fake_treasure':
        tag = "GREED PUNISHED";
        break;
      case 'lying_checkpoint':
        tag = "FALSE HOPE";
        break;
      case 'fake_exit':
        tag = "CRUEL TRICK";
        break;
      case 'overpowered_spring':
        tag = "ROCKET MAN";
        break;
      case 'reverse_psychology':
        tag = "BAD ADVICE";
        break;
      case 'last_second_trap':
        tag = "DENIED AT THE DOOR";
        break;
      case 'memory_test':
        tag = "MEMORY LAPSE";
        break;
      default:
        tag = `LEVEL ${levelNumber} SAYS HI`;
        break;
    }
  }

  // Filter out recent roasts if possible
  const available = candidatePool.filter((msg) => !recentRoasts.includes(msg));
  const selectionPool = available.length > 0 ? available : candidatePool;
  const picked = selectionPool[Math.floor(Math.random() * selectionPool.length)];

  // Update recent queue
  recentRoasts.push(picked);
  if (recentRoasts.length > 6) {
    recentRoasts.shift();
  }

  // Funny subtitle based on total deaths
  let subtext = undefined;
  if (totalDeaths === 1) {
    subtext = "First of many. Welcome to NICE TRY!";
  } else if (totalDeaths === 10) {
    subtext = "Double digits! The traps appreciate your service.";
  } else if (totalDeaths === 50) {
    subtext = "Half a century of failures. You're practically family now.";
  } else if (totalDeaths === 100) {
    subtext = "100 DEATHS! The developer owes you an apology.";
  }

  return {
    message: picked,
    subtext,
    tag,
  };
}

export function getRankTitle(totalDeaths: number, completedCount: number): { title: string; color: string } {
  if (completedCount >= 15 && totalDeaths <= 10) {
    return { title: "Suspiciously Competent", color: "text-amber-400" };
  }
  if (completedCount >= 15) {
    return { title: "Grand Trap Conqueror", color: "text-emerald-400" };
  }
  if (totalDeaths >= 150) {
    return { title: "Pure Masochist", color: "text-rose-500" };
  }
  if (totalDeaths >= 100) {
    return { title: "Psychological Experiment Subject", color: "text-purple-400" };
  }
  if (totalDeaths >= 50) {
    return { title: "Certified Trap Tester", color: "text-orange-400" };
  }
  if (totalDeaths >= 30) {
    return { title: "Spikes' Favorite Customer", color: "text-red-400" };
  }
  if (totalDeaths >= 15) {
    return { title: "Professional Floor Inspector", color: "text-yellow-400" };
  }
  if (totalDeaths >= 5) {
    return { title: "Apprentice Victim", color: "text-cyan-400" };
  }
  return { title: "Innocent Optimist", color: "text-green-400" };
}
