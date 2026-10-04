export interface Reply {
  /** What the learner can say. "{x}" stands for any word(s), like a name. */
  text: string;
  english: string;
}

export interface DialogueLine {
  /** What the buddy says. */
  buddy: string;
  english: string;
  /** Accepted learner answers. Omitted on the buddy's final line. */
  replies?: Reply[];
  /** Optional English tip shown while it's the learner's turn. */
  tip?: string;
}

export interface Dialogue {
  id: string;
  title: string;
  emoji: string;
  description: string;
  lines: DialogueLine[];
}
