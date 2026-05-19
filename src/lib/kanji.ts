export type KanjiKey =
  | "ware"
  | "waza_skills"
  | "michi"
  | "waza_work"
  | "en"
  | "bu"
  | "tokei";

export interface KanjiData {
  glyph: string;
  reading: string;
  meaningEn: string;
  meaningIt: string;
}

export const kanji: Record<KanjiKey, KanjiData> = {
  ware: {
    glyph: "我",
    reading: "ware",
    meaningEn: "self, I",
    meaningIt: "io, sé",
  },
  waza_skills: {
    glyph: "技",
    reading: "waza",
    meaningEn: "technique, skill",
    meaningIt: "tecnica, abilità",
  },
  michi: {
    glyph: "道",
    reading: "michi · dō",
    meaningEn: "the way, path",
    meaningIt: "la via, il cammino",
  },
  waza_work: {
    glyph: "業",
    reading: "waza · gō",
    meaningEn: "work, craft",
    meaningIt: "opera, mestiere",
  },
  en: {
    glyph: "縁",
    reading: "en",
    meaningEn: "connection, fate",
    meaningIt: "connessione, legame",
  },
  bu: {
    glyph: "武",
    reading: "bu",
    meaningEn: "warrior, martial",
    meaningIt: "guerriero, marziale",
  },
  tokei: {
    glyph: "統計",
    reading: "tōkei",
    meaningEn: "statistics",
    meaningIt: "statistiche",
  },
};
