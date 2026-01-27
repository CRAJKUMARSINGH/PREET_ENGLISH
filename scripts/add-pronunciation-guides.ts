import { db } from "../server/db";
import { vocabulary } from "../shared/schema";
import { eq } from "drizzle-orm";

interface PronunciationChallenge {
    ipa: string;
    challenge: string;
    tip: string;
    syllableStress?: string;
}

const PRONUNCIATION_CHALLENGES: Record<string, PronunciationChallenge> = {
    // Consonant challenges
    v: {
        ipa: "/v/",
        challenge: "Hindi speakers often pronounce 'v' as 'w' (e.g., 'very' → 'wery')",
        tip: "Touch your upper teeth to your lower lip and vibrate your vocal cords. Feel the vibration!",
        syllableStress: "VE-ry",
    },
    w: {
        ipa: "/w/",
        challenge: "Confusion with 'v' sound. Often pronounced with teeth contact.",
        tip: "Round your lips like saying 'oo', then quickly say the word. No teeth touching!",
        syllableStress: "WA-ter",
    },
    th: {
        ipa: "/θ/ or /ð/",
        challenge: "Often pronounced as 't' or 'd' (e.g., 'think' → 'tink', 'this' → 'dis')",
        tip: "Place your tongue between your teeth and blow air. Practice: 'think, this, three'",
        syllableStress: "THINK",
    },
    r: {
        ipa: "/r/",
        challenge: "Hindi 'र' is different from English 'r'. Often sounds too rolled.",
        tip: "Curl your tongue back slightly (retroflex) but don't roll it. Keep it smooth.",
        syllableStress: "RED",
    },
    z: {
        ipa: "/z/",
        challenge: "Often pronounced as 'j' sound (e.g., 'zoo' → 'joo')",
        tip: "Same mouth position as 's' but vibrate your vocal cords. Try 'ssss' then 'zzzz'",
        syllableStress: "ZOO",
    },

    // Vowel challenges
    a: {
        ipa: "/æ/ or /eɪ/",
        challenge: "English 'a' has multiple sounds. Hindi speakers often use only one.",
        tip: "In 'cat' it's /æ/ (open mouth wide). In 'cake' it's /eɪ/ (say 'ay')",
        syllableStress: "CAT, CAKE",
    },
    e: {
        ipa: "/e/ or /iː/",
        challenge: "Confusion between short 'e' (bed) and long 'ee' (bee)",
        tip: "Short 'e': relaxed mouth. Long 'ee': smile and stretch lips",
        syllableStress: "BED, BEE",
    },
    i: {
        ipa: "/ɪ/ or /aɪ/",
        challenge: "Short 'i' (sit) vs long 'i' (site) confusion",
        tip: "Short 'i': quick sound. Long 'i': say 'ah-ee' quickly",
        syllableStress: "SIT, SITE",
    },
    o: {
        ipa: "/ɒ/ or /oʊ/",
        challenge: "Different 'o' sounds in 'hot' vs 'hope'",
        tip: "In 'hot': open mouth. In 'hope': round lips and say 'oh'",
        syllableStress: "HOT, HOPE",
    },
    u: {
        ipa: "/ʊ/ or /uː/",
        challenge: "Short 'u' (put) vs long 'oo' (pool) confusion",
        tip: "Short 'u': relaxed lips. Long 'oo': round lips tightly",
        syllableStress: "PUT, POOL",
    },
};

// Common word patterns and their pronunciation guides
const WORD_PATTERNS: Record<string, { ipa: string; stress: string; tip: string }> = {
    // Words ending in -tion
    tion: {
        ipa: "/ʃən/",
        stress: "-TION",
        tip: "Pronounce as 'shun', not 'ti-on'. Example: ac-TION, na-TION",
    },
    // Words ending in -ed
    ed_after_t_d: {
        ipa: "/ɪd/",
        stress: "-ed",
        tip: "After 't' or 'd', pronounce as separate syllable: want-ed, need-ed",
    },
    ed_after_voiceless: {
        ipa: "/t/",
        stress: "-ed",
        tip: "After voiceless sounds (p,k,f,s,sh,ch), pronounce as 't': walked, helped",
    },
    ed_after_voiced: {
        ipa: "/d/",
        stress: "-ed",
        tip: "After voiced sounds, pronounce as 'd': played, called",
    },
};

async function addPronunciationGuides() {
    console.log("🔊 Starting pronunciation guide enhancement...\n");

    const allVocab = await db.select().from(vocabulary);
    console.log(`📊 Processing ${allVocab.length} vocabulary items\n`);

    let updated = 0;

    for (const word of allVocab) {
        const wordLower = word.word.toLowerCase();
        const firstLetter = wordLower[0];

        let ipa = "";
        let challenge = "";
        let tip = "";
        let syllableStress = "";

        // Check for first letter challenges
        if (PRONUNCIATION_CHALLENGES[firstLetter]) {
            const guide = PRONUNCIATION_CHALLENGES[firstLetter];
            ipa = guide.ipa;
            challenge = guide.challenge;
            tip = guide.tip;
            syllableStress = guide.syllableStress || "";
        }

        // Check for common patterns
        if (wordLower.endsWith("tion")) {
            const pattern = WORD_PATTERNS.tion;
            ipa += ` ${pattern.ipa}`;
            tip += ` | ${pattern.tip}`;
        } else if (wordLower.endsWith("ed")) {
            // Determine which -ed pronunciation
            const beforeEd = wordLower[wordLower.length - 3];
            if (beforeEd === 't' || beforeEd === 'd') {
                tip += ` | ${WORD_PATTERNS.ed_after_t_d.tip}`;
            }
        }

        // Add common Hindi speaker challenges for specific words
        const hindiSpeakerChallenges: Record<string, string> = {
            very: "Often mispronounced as 'wery'. Practice: VE-ry (touch teeth to lip)",
            world: "Often mispronounced as 'vorld'. Practice: WOR-ld (round lips, no teeth)",
            three: "Often mispronounced as 'tree'. Practice: put tongue between teeth",
            the: "Often mispronounced as 'da'. Practice: tongue between teeth, say 'thuh'",
            this: "Often mispronounced as 'dis'. Practice: voiced 'th' sound",
            think: "Often mispronounced as 'tink'. Practice: voiceless 'th' sound",
            thank: "Often mispronounced as 'tank'. Practice: 'th' + 'ank'",
            with: "Often mispronounced as 'vit' or 'wit'. Practice: 'wi' + 'th'",
            water: "Often mispronounced as 'vater'. Practice: WA-ter (round lips)",
            work: "Often mispronounced as 'vork'. Practice: WOR-k (round lips first)",
        };

        if (hindiSpeakerChallenges[wordLower]) {
            challenge = hindiSpeakerChallenges[wordLower];
        }

        // Only update if we have pronunciation data
        if (ipa || challenge || tip) {
            try {
                await db
                    .update(vocabulary)
                    .set({
                        pronunciation: ipa || word.pronunciation,
                        hindiPronunciation: syllableStress || word.hindiPronunciation,
                        commonMispronunciation: challenge || word.commonMispronunciation,
                        usageHindi: tip || word.usageHindi,
                    })
                    .where(eq(vocabulary.id, word.id));

                updated++;

                if (updated % 500 === 0) {
                    console.log(`✅ Updated ${updated}/${allVocab.length} vocabulary items`);
                }
            } catch (error) {
                console.error(`❌ Error updating word ${word.word}:`, error);
            }
        }
    }

    console.log(`\n✅ Pronunciation guide enhancement complete!`);
    console.log(`📊 Total vocabulary items updated: ${updated}\n`);

    return updated;
}

// Run the script
addPronunciationGuides()
    .then((count) => {
        console.log(`🎉 Success! Added pronunciation guides to ${count} words.`);
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Error:", error);
        process.exit(1);
    });
