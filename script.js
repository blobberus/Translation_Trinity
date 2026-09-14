const pages = document.querySelectorAll(".page");
const links = document.querySelectorAll("[data-target]");

function showPage(targetId) {
  pages.forEach((page) => {
    page.hidden = page.id !== targetId;
  });
}

function showFromHash() {
  const hash = window.location.hash.replace("#", "");
  const map = {
    "home": "page-home",
    "poem-1": "page-poem-1",
    "poem-2": "page-poem-2",
    "why-this-project": "page-why",
    "works-cited": "page-works-cited",
  };
  showPage(map[hash] || "page-home");
}

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.hash = link.getAttribute("href");
    showFromHash();
  });
});

window.addEventListener("hashchange", showFromHash);
showFromHash();

// Cursor-follow gradient on buttons
const gradientTargets = document.querySelectorAll(
  ".poem-button, .nav-link, .dropdown-toggle, .dropdown-item"
);

gradientTargets.forEach((el) => {
  el.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.background = `radial-gradient(circle at ${x}% ${y}%, #f4eedd 0%, #e8dcc3 65%)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.background = "";
  });
});

// Collapsible / swipeable side navigation
const sidebarWrapper = document.getElementById("sidebarWrapper");
const sidebarTab = document.getElementById("sidebarTab");
let sidebarOpen = true;

function setSidebarOpen(isOpen) {
  sidebarOpen = isOpen;
  sidebarWrapper.classList.toggle("collapsed", !isOpen);
  sidebarTab.classList.toggle("collapsed", !isOpen);
  document.body.classList.toggle("sidebar-collapsed", !isOpen);
  sidebarTab.innerHTML = isOpen ? "&lsaquo;" : "&rsaquo;";
  sidebarTab.setAttribute("aria-expanded", String(isOpen));
}

sidebarTab.addEventListener("click", () => {
  setSidebarOpen(!sidebarOpen);
});

let touchStartX = null;

sidebarWrapper.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0].clientX;
  },
  { passive: true }
);

sidebarWrapper.addEventListener(
  "touchend",
  (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (deltaX < -40) {
      setSidebarOpen(false);
    } else if (deltaX > 40) {
      setSidebarOpen(true);
    }
    touchStartX = null;
  },
  { passive: true }
);

// Translation method dropdowns
const translations = {
  "poem-1": {
    bynner: {
      title: "Human Translation: Bynner",
      lines: [
        "Far off in Fuzhou she is watching the moonlight,",
        "Watching it alone from the window of her chamber—",
        "For our boy and girl, poor little babes,",
        "Are too young to know where the Capital is.",
        "Her cloudy hair is sweet with mist,",
        "Her jade-white shoulder is cold in the moon.",
        "When shall we lie again, with no more tears,",
        "Watching this bright light on our screen?",
      ],
      methodology: [
        "This is the pre-existing human translation of “On a Moonlit Night” by Witter Bynner, included in the project organizer as the baseline human translation for comparison against the LLM-assisted methods below.",
      ],
    },
    rhyme: {
      title: "Musician",
      lines: [
        "Tonight, Fuzhou’s moon;",
        "Lone, she looks on high.",
        "Far off, poor children—",
        "Chang’an: why this sigh?",
        "Scented mist wets hair;",
        "Cold jade arms there lie.",
        "When, by the curtain,",
        "Will our tears both dry?",
      ],
      methodology: [
        "In “Moonlit Night,” the rhyme words are 看、安、寒、干. These groupings follow traditional rhyme categories; modern Mandarin pronunciation does not preserve all the correspondences. See the traditional rhyme table.",
        "The English versions reproduce the syllable counts and placement of rhymes, rather than the Chinese rhyme sounds or tonal patterns.",
        "Syllables by line: 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5",
        "Rhyme scheme: x A x A x A x A",
        "Rhyming endings: high / sigh / lie / dry",
        "Changes required by the form: “Why this sigh?” condenses the children’s failure to understand longing for Chang’an into a question. The chamber, cloudlike hairstyle, and final illumination of both people are omitted. “There lie” supplies the rhyme without an explicit equivalent in the Chinese. “Our” counts as one syllable.",
      ],
    },
    meaning: {
      title: "Etymologist",
      lines: [
        "Tonight, the moon over Fuzhou",
        "Is watched by her alone in her chamber.",
        "From far away, I pity the little children,",
        "Who do not yet understand longing for Chang’an.",
        "Fragrant mist wets her cloudlike coils of hair;",
        "Clear moonlight chills her jade-like arms.",
        "When will we lean together beside the empty curtain,",
        "With the moon shining on us both and our tear tracks dry?",
      ],
      methodology: [
        "These versions have no imposed meter or rhyme. Ordinary English grammar supplies pronouns, articles, and connecting words where the Chinese omits them.",
        "Word meanings and grammatical choices:",
        "今夜鄜州月: 今夜 means “tonight”; 鄜州 is the place name Fuzhou; 月 means “moon.” The Chinese presents a noun phrase whose connection to “watch” follows in line 2. The English preserves that connection across the line break.",
        "闺中只独看: 闺 means a woman’s private chamber; 中 means “inside”; 只独 emphasizes being alone; 看 means “look at” or “watch.” “Her” supplies the unstated female observer. Identifying her as the speaker’s wife is a contextual interpretation, not an explicit word in this line.",
        "遥怜小儿女: 遥 means “from afar”; 怜 can mean pity or tender affection; 小儿女 means young children, literally little sons and daughters. I choose “pity” and supply “I” as the observer. Hanzi dictionary: 怜.",
        "未解忆长安: 未 means “not yet”; 解 means “understand”; 忆 means remember or think of; 长安 is Chang’an. “Longing for” interprets the remembering as emotionally charged. The children are the understood subject. Whose longing they fail to understand is not explicitly stated.",
        "香雾云鬟湿: 香 means fragrant; 雾 means mist; 云 means cloud; 鬟 means a coiled hairstyle; 湿 means wet. “Cloudlike” retains the metaphor, while “wets” makes the relationship grammatical in English. Compare 鬟 and the English definition of mist.",
        "清辉玉臂寒: 清辉 means clear radiance, understood here as moonlight; 玉 means jade; 臂 means arm; 寒 means cold. “Jade-like” preserves the image without specifying a particular skin color. “Chills” parallels “wets” in line 5.",
        "何时倚虚幌: 何时 means “when”; 倚 means lean against or beside; 虚 means empty or unoccupied; 幌 means curtain. “Together” is supplied from the following line’s 双, “both.” “Empty curtain” preserves the unusual wording; its precise spatial implication remains uncertain. 虚, 幌.",
        "双照泪痕干: 双 means both or a pair; 照 means illuminate; 泪痕 means tear marks; 干 means dry. The moon is supplied as the illuminating subject. The English retains the imagined future condition without asserting that moonlight physically dries the tears.",
      ],
    },
    korean: {
      title: "Trilingualist",
      lines: [
        "Tonight the moon shines on Fuzhou.",
        "Within her room my wife alone looks up at the sky.",
        "From far away I pity our young sons and girls.",
        "They do not know yet how to miss Chang’an, or know why.",
        "The scented mist has left the coils of her cloudlike hair all dripping wet.",
        "Her arms, as pale as jade, in clear moonlight coldly lie.",
        "When shall we lean beside the empty curtain, close—",
        "The moon will shine upon us both, and all our tracks of tears be dry?",
      ],
      methodology: [
        "The Korean versions prioritize meaning and grammatical structure. The English versions then match each Korean line’s syllable count, while restoring the Chinese originals’ x A x A x A x A rhyme pattern.",
        "The Korean intermediates have no imposed rhyme scheme. Counting their syllables uses pronounced Hangul syllable blocks, excluding spaces and punctuation.",
        "Korean intermediate (달밤):",
        "오늘 밤 부주의 달을 / 아내는 방 안에서 홀로 바라본다. / 멀리서 어린 아들딸이 가엾다. / 아직 장안을 그리워할 줄 모른다. / 향기로운 안개에 구름 같은 쪽머리가 젖고, / 맑은 달빛에 옥 같은 팔이 차갑다. / 언제 빈 휘장 곁에 함께 기대어 / 둘 다 달빛을 받으며 눈물 자국이 마를까?",
        "Korean syllables by line: 8 / 13 / 12 / 13 / 17 / 13 / 12 / 16",
        "Rhyme: Unconstrained.",
        "Chinese → Korean: lexical and grammatical notes:",
        "今夜 → 오늘 밤, “tonight”; 鄜州 → 부주, the Korean reading of the place name; 月 → 달, “moon.” The object marker 을 connects the moon to 바라본다 in line 2.",
        "闺中 → 방 안에서, “inside the room”; 只独 → 홀로, “alone”; 看 → 바라본다, “looks at.” 아내, “wife,” makes the contextual identification explicit and therefore narrows the Chinese.",
        "遥 → 멀리서, “from afar”; 小儿女 → 어린 아들딸, “young sons and daughters”; 怜 → 가엾다, “are pitiable.” Korean naturally leaves the person experiencing pity unstated.",
        "未解 → 아직 … 줄 모른다, “does not yet know how”; 忆 → 그리워하다, “miss or long for”; 长安 → 장안. This wording emphasizes the children’s inability to experience or understand the longing.",
        "香雾 → 향기로운 안개, “fragrant mist”; 云鬟 → 구름 같은 쪽머리, “cloudlike coiled hair”; 湿 → 젖다, “become wet.” 안개 has the dictionary meanings fog, mist, and haze; “mist” fits the image here.",
        "清辉 → 맑은 달빛, “clear moonlight”; 玉臂 → 옥 같은 팔, “jade-like arms”; 寒 → 차갑다, “be cold.” The Korean retains the descriptive construction rather than making moonlight an active agent.",
        "何时 → 언제, “when”; 虚幌 → 빈 휘장, “empty curtain”; 倚 → 기대다, “lean.” 곁에, “beside,” resolves the physical relationship; 함께, “together,” anticipates 双.",
        "双照 → 둘 다 달빛을 받으며, “both receiving moonlight”; 泪痕 → 눈물 자국, “tear marks”; 干 → 마르다, “dry.” The ending 마를까 carries the question begun in line 7.",
        "English syllables by line: 8 / 13 / 12 / 13 / 17 / 13 / 12 / 16",
        "Rhyme scheme: x A x A x A x A",
        "Rhyming endings: sky / why / lie / dry",
        "Korean → English: choices and departures:",
        "오늘 밤 and 부주의 달 become “tonight” and “the moon … on Fuzhou.” “Shines” supplies a verb for the eight-syllable line.",
        "아내, 방 안에서, and 홀로 become “wife,” “within her room,” and “alone.” “Looks up at the sky” expands 바라본다 to provide the rhyme.",
        "가엾다 becomes the active English “I pity.” “Our” supplies a family relationship; it counts as one syllable.",
        "그리워할 줄 모른다 becomes “do not know … how to miss.” “Or know why” expands the lack of understanding for meter and rhyme.",
        "쪽머리 becomes “coils … of hair.” “Dripping wet” intensifies 젖다, which states wetness without requiring dripping.",
        "옥 같은 becomes “as pale as jade,” narrowing the comparison to color. “Coldly lie” rearranges 차갑다 into a rhyming English clause and adds a resting posture.",
        "함께 becomes “we” and “close”; 빈 휘장 remains “empty curtain.” “Close” reinforces proximity.",
        "달빛을 받으며 becomes “the moon will shine upon us.” 눈물 자국 remains “tracks of tears”; 마르다 becomes “be dry.” The question extends across the final two lines.",
      ],
    },
  },
  "poem-2": {
    bynner: {
      title: "Human Translation: Bynner",
      lines: [
        "Though a country be sundered, hills and rivers endure;",
        "And spring comes green again to trees and grasses.",
        "Where petals have been shed like tears",
        "And lonely birds have sung their grief",
        ". . . . After the war-fires of three months,",
        "One message from home is worth a ton of gold",
        ". . . . I stroke my white hair. It has grown too thin",
        "To hold the hairpins any more.",
      ],
      methodology: [
        "This is the pre-existing human translation of “A Spring View” by Witter Bynner, included in the project organizer as the baseline human translation for comparison against the LLM-assisted methods below.",
      ],
    },
    rhyme: {
      title: "Musician",
      lines: [
        "State torn; hills, streams stand.",
        "Spring town: trees grow deep.",
        "Sad times: blooms shed tears;",
        "Birds: torn hearts now leap.",
        "War burns three months long;",
        "Home news—a gold heap.",
        "Scratched white hair grows short;",
        "No pin can it keep.",
      ],
      methodology: [
        "In “Spring Scene,” the rhyme words are 深、心、金、簪. These groupings follow traditional rhyme categories; modern Mandarin pronunciation does not preserve all the correspondences. See the traditional rhyme table.",
        "The English versions reproduce the syllable counts and placement of rhymes, rather than the Chinese rhyme sounds or tonal patterns.",
        "Syllables by line: 5 / 5 / 5 / 5 / 5 / 5 / 5 / 5",
        "Rhyme scheme: x A x A x A x A",
        "Rhyming endings: deep / leap / heap / keep",
        "Changes required by the form: “Hills, streams” compresses “mountains and rivers.” Grass is omitted. “Torn hearts” compresses grief over separation; “leap” represents being startled. “A gold heap” loses the explicit number ten thousand. “Pin” abbreviates “hairpin.” Line 3 adopts the possible personification in which flowers themselves shed tears.",
      ],
    },
    meaning: {
      title: "Etymologist",
      lines: [
        "The state is shattered, but mountains and rivers remain.",
        "Spring is in the city; grass and trees grow thick.",
        "Grieving over the times, I shed tears at the flowers;",
        "Distressed by separation, I am startled by the birds.",
        "War beacons have continued for three months;",
        "A letter from home is worth ten thousand in gold.",
        "As I scratch my white hair, it grows still shorter,",
        "Until it can scarcely hold a hairpin.",
      ],
      methodology: [
        "These versions have no imposed meter or rhyme. Ordinary English grammar supplies pronouns, articles, and connecting words where the Chinese omits them.",
        "Word meanings and grammatical choices:",
        "国破山河在: 国 means state or country; 破 means broken or ruined; 山河 means mountains and rivers; 在 means remain or be present. “But” makes the implied contrast explicit.",
        "城春草木深: 城 means city; 春 means spring; 草木 means grass and trees, or vegetation collectively; 深 means deep. For vegetation, “grow thick” is more natural English than “are deep.”",
        "感时花溅泪: 感 means feel or be moved by; 时 means the times or current circumstances; 花 means flowers; 溅 means splash or spatter; 泪 means tears. I choose the reading in which the speaker sheds tears on seeing flowers. The wording also permits personification: flowers shedding tears in response to the times.",
        "恨别鸟惊心: 恨 means resent, regret, or grieve over; 别 means separation; 鸟 means birds; 惊心 means startle the heart. “Distressed by separation” expresses the emotional sense without suggesting hatred of a person. “I” connects this line grammatically with the preceding one.",
        "烽火连三月: 烽火 literally means signal or beacon fires and can represent warfare; 连 means continue or extend without interruption; 三月 can mean three months or the third month. I select “for three months,” supported by 连, while acknowledging the calendar reading.",
        "家书抵万金: 家书 means a family letter; 抵 means equal in value or be worth; 万 means ten thousand; 金 means gold or money. “From home” chooses a direction not explicitly marked. “Ten thousand in gold” avoids inventing a particular coin or weight.",
        "白头搔更短: 白头 literally means white head, referring to white hair; 搔 means scratch; 更 means still more; 短 means short. The English retains “shorter” rather than silently substituting “thinner.”",
        "浑欲不胜簪: 浑 is an intensifier; 欲 can indicate approaching a condition; 不胜 means unable to bear or support; 簪 means a hairpin. “Can scarcely hold” combines impending inability with grammatical English. The modern everyday meaning “win” for 胜 would be inappropriate here.",
      ],
    },
    korean: {
      title: "Trilingualist",
      lines: [
        "The state has fallen, yet the mountains and rivers still remain.",
        "Spring fills the city; all the grass and trees now grow thick and deep.",
        "In sorrow for these troubled times, I look at blooms and let my tears fall.",
        "The grief of being parted makes my heart at every small bird leap.",
        "The beacon flames have burned for three months on end.",
        "A note from home is worth ten thousand coins of gold piled in a heap.",
        "The more I scratch my head, the shorter grow the strands of white.",
        "Now even one small hairpin is too much for this hair to keep.",
      ],
      methodology: [
        "The Korean versions prioritize meaning and grammatical structure. The English versions then match each Korean line’s syllable count, while restoring the Chinese originals’ x A x A x A x A rhyme pattern.",
        "The Korean intermediates have no imposed rhyme scheme. Counting their syllables uses pronounced Hangul syllable blocks, excluding spaces and punctuation.",
        "Korean intermediate (봄의 풍경):",
        "나라는 무너져도 산과 강은 남아 있다. / 봄이 온 성 안에 풀과 나무가 무성하다. / 시국을 슬퍼하니 꽃을 보고 눈물을 흘리고, / 이별이 한스러우니 새에 마음이 놀란다. / 봉화는 석 달 동안 이어지고, / 집에서 온 편지는 만금의 값어치가 있다. / 흰 머리카락은 긁을수록 더 짧아져 / 이제는 비녀조차 꽂지 못할 지경이다.",
        "Korean syllables by line: 15 / 15 / 17 / 16 / 11 / 16 / 14 / 15",
        "Rhyme: Unconstrained.",
        "Chinese → Korean: lexical and grammatical notes:",
        "国破 → 나라는 무너져도, “although the state collapses”; 山河在 → 산과 강은 남아 있다, “mountains and rivers remain.” 도 makes the contrast explicit.",
        "城春 → 봄이 온 성 안, “inside the city where spring has come”; 草木 → 풀과 나무, “grass and trees”; 深 → 무성하다, “grow thick or luxuriant.”",
        "感时 → 시국을 슬퍼하다, “grieve over current circumstances”; 花溅泪 → 꽃을 보고 눈물을 흘리다, “see flowers and shed tears.” 보고, “seeing,” explicitly selects the human-response interpretation.",
        "恨别 → 이별이 한스럽다, “separation is grievous”; 鸟惊心 → 새에 마음이 놀라다, “the heart is startled by birds.” The causal ending 니 connects grief with the response.",
        "烽火 → 봉화, “signal fires”; 连 → 이어지다, “continue”; 三月 → 석 달 동안, “for three months.” This commits to duration.",
        "家书 → 집에서 온 편지, “a letter from home”; 抵 → 값어치가 있다, “have the value of”; 万金 → 만금, “ten thousand in gold,” also suggesting great wealth.",
        "白头 → 흰 머리카락, “white hair”; 搔 → 긁다, “scratch”; 更短 → 더 짧아지다, “become shorter.” 긁을수록 means “the more one scratches,” making the relationship explicit.",
        "簪 → 비녀, “hairpin”; 浑欲不胜 → 꽂지 못할 지경, “the point of being unable to insert it.” This is a natural Korean expression but shifts “support” toward “insert.” The object’s hair-fastening sense is retained.",
        "English syllables by line: 15 / 15 / 17 / 16 / 11 / 16 / 14 / 15",
        "Rhyme scheme: x A x A x A x A",
        "Rhyming endings: deep / leap / heap / keep",
        "Pronunciation: “Every” counts as two syllables; “hairpin” counts as two.",
        "Korean → English: choices and departures:",
        "무너져도 becomes “has fallen, yet”; 남아 있다 becomes “still remain.” English supplies the perfect tense.",
        "무성하다 becomes “grow thick and deep.” “All” and “now” fill the syllable count; “deep” supplies the rhyme.",
        "시국 becomes “these troubled times.” 꽃을 보고 눈물을 흘리다 becomes “look at blooms and let my tears fall,” preserving the Korean’s explicit human subject.",
        "마음이 놀란다 becomes “my heart … leap.” “Every small” is added for meter and introduces details absent from the Korean.",
        "봉화 becomes “beacon flames”; 석 달 동안 이어지다 becomes “have burned for three months on end.”",
        "편지 becomes the shorter “note.” 만금 becomes “ten thousand coins of gold”: “coins” supplies a concrete unit absent from the Korean. “Piled in a heap” supplies the rhyme and an added visual arrangement.",
        "긁을수록 becomes “the more I scratch.” 흰 머리카락 becomes “strands of white,” and 더 짧아져 becomes “the shorter grow.”",
        "비녀조차 becomes “even one small hairpin.” “Too much … to keep” shifts the Korean’s inability to insert a hairpin toward inability to retain one. “Small” is added for meter.",
      ],
    },
  },
};

// Manual, hand-edited methodology notes: one independent slot per poem per
// method. Edit the strings below directly to fill these in.
const manualNotes = {
  "poem-1": {
    bynner: "Bynner, a poet himself, translates Du Fu's poetry through a focus on spirit and emotional essence. This methodology sacrifices the rhythm/patterns, direct definitional translations, and poetic structure of Du Fu, but reveals underlying meanings that cannot be drawn from a word-by-word translation.",
    rhyme: "The Musician is an LLM which focuses on maintaining the structure of the poetry in lieu of precise definitions. The model was trained on a dataset of English and Chinese poetry textbooks which discuss rhyming patterns. In order to prioritize the choice of rhyming schemes and word structure over optimal translation and grammar, the model was trained on many English/Chinese thesauruses with syllable count for each words (this dataset was an exploded list of dictionaries detailed in the citations section).",
    meaning: "The Etymologist is an LLM which focuses on capturing the most effective gramatical structure and definitions of words. This model was rigorously trained on 10 different dictionaries and translation methodologies for significant cultural symbolism (both for Chinese and English). The model was also trained on a curated list of Chinese metaphors and references of historical documents relevant to Du Fu's time.",
    korean: "The Trilingualist is an LLM that uses an experimental version of Chinese to English poetic translation: It translates from Chinese to Korean, then to English. This translation methodology leans on the fact that Korean was partially derived from Chinese--meaning that there are many common words between the languages--which means that there's nearly double the research and translation on the two langauges. This way, the model can use both Korean to English and Chinese to English dictionaries to use a similar translation methodology as the Etymologist model to get a more accurate definitional and translation.",
  },
  "poem-2": {
    bynner: "Bynner, a poet himself, translates Du Fu's poetry through a focus on spirit and emotional essence. This methodology sacrifices the rhythm/patterns, direct definitional translations, and poetic structure of Du Fu, but reveals underlying meanings that cannot be drawn from a word-by-word translation.",
    rhyme: "The Musician is an LLM which focuses on maintaining the structure of the poetry in lieu of precise definitions. The model was trained on a dataset of English and Chinese poetry textbooks which discuss rhyming patterns. In order to prioritize the choice of rhyming schemes and word structure over optimal translation and grammar, the model was trained on many English/Chinese thesauruses with syllable count for each words (this dataset was an exploded list of dictionaries detailed in the citations section).",
    meaning: "The Etymologist is an LLM which focuses on capturing the most effective gramatical structure and definitions of words. This model was rigorously trained on 10 different dictionaries and translation methodologies for significant cultural symbolism (both for Chinese and English). The model was also trained on a curated list of Chinese metaphors and references of historical documents relevant to Du Fu's time.",
    korean: "The Trilingualist is an LLM that uses an experimental version of Chinese to English poetic translation: It translates from Chinese to Korean, then to English. This translation methodology leans on the fact that Korean was partially derived from Chinese--meaning that there are many common words between the languages--which means that there's nearly double the research and translation on the two langauges. This way, the model can use both Korean to English and Chinese to English dictionaries to use a similar translation methodology as the Etymologist model to get a more accurate definitional and translation.",
  },
};

function renderTranslation(poemId, method) {
  const entry = translations[poemId][method];
  const output = document.getElementById(`output-${poemId}`);
  output.innerHTML = "";

  const title = document.createElement("h3");
  title.className = "translation-title";
  title.textContent = entry.title;

  const body = document.createElement("div");
  body.className = "translation-poem";
  entry.lines.forEach((line, index) => {
    if (index > 0) body.appendChild(document.createElement("br"));
    body.appendChild(document.createTextNode(line));
  });

  output.appendChild(title);
  output.appendChild(body);

  const manualBox = document.createElement("div");
  manualBox.className = "methodology-box manual-methodology";

  const manualTitle = document.createElement("h3");
  manualTitle.className = "methodology-title";
  manualTitle.textContent = "Translation Model Methodology";
  manualBox.appendChild(manualTitle);

  const manualBody = document.createElement("p");
  manualBody.className = "placeholder-text";
  manualBody.textContent = manualNotes[poemId][method];
  manualBox.appendChild(manualBody);

  const manualEditNote = document.createElement("p");
  manualEditNote.className = "edit-note";
  manualBox.appendChild(manualEditNote);

  output.appendChild(manualBox);

  if (entry.methodology && entry.methodology.length) {
    const box = document.createElement("div");
    box.className = "methodology-box";

    const boxTitle = document.createElement("h4");
    boxTitle.className = "methodology-title";
    boxTitle.textContent = "Model Brain: What the LLM is Thinking During the Translation";
    box.appendChild(boxTitle);

    const boxSubtitle = document.createElement("p");
    boxSubtitle.className = "methodology-subtitle";
    boxSubtitle.textContent = "The most important translation decisions are converted into text reasoning by the LLM.";
    box.appendChild(boxSubtitle);

    entry.methodology.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      box.appendChild(p);
    });

    output.appendChild(box);
  }
}

document.querySelectorAll(".dropdown-item").forEach((button) => {
  button.addEventListener("click", () => {
    const { poem, method } = button.dataset;
    renderTranslation(poem, method);
  });
});

renderTranslation("poem-1", "bynner");
renderTranslation("poem-2", "bynner");

// Dropdowns open downward by default, and flip upward only when there
// isn't enough room below the button to show the full menu.
document.querySelectorAll(".translation-dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");

  function updateDirection() {
    const toggleRect = toggle.getBoundingClientRect();
    const previousDisplay = menu.style.display;
    menu.style.visibility = "hidden";
    menu.style.display = "block";
    const menuHeight = menu.offsetHeight;
    menu.style.display = previousDisplay;
    menu.style.visibility = "";

    const spaceBelow = window.innerHeight - toggleRect.bottom;
    const spaceAbove = toggleRect.top;
    const opensUp = spaceBelow < menuHeight && spaceAbove > spaceBelow;

    dropdown.classList.toggle("dropdown-up", opensUp);
  }

  dropdown.addEventListener("mouseenter", updateDirection);
  toggle.addEventListener("focus", updateDirection);
});
