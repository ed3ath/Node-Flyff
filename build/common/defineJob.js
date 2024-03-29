"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildRank = exports.TroupRank = exports.SkillGroupDisciple = exports.DefineJob = exports.JobMax = exports.JobType = void 0;
var JobType;
(function (JobType) {
    JobType[JobType["JTYPE_BASE"] = 0] = "JTYPE_BASE";
    JobType[JobType["JTYPE_EXPERT"] = 1] = "JTYPE_EXPERT";
    JobType[JobType["JTYPE_PRO"] = 2] = "JTYPE_PRO";
    JobType[JobType["JTYPE_TROUPE"] = 3] = "JTYPE_TROUPE";
    JobType[JobType["JTYPE_COMMON"] = 4] = "JTYPE_COMMON";
    JobType[JobType["JTYPE_MASTER"] = 5] = "JTYPE_MASTER";
    JobType[JobType["JTYPE_HERO"] = 6] = "JTYPE_HERO";
    JobType[JobType["JTYPE_LEGEND_HERO"] = 7] = "JTYPE_LEGEND_HERO";
})(JobType || (exports.JobType = JobType = {}));
var JobMax;
(function (JobMax) {
    JobMax[JobMax["MAX_JOB_SKILL"] = 3] = "MAX_JOB_SKILL";
    JobMax[JobMax["MAX_EXPERT_SKILL"] = 20] = "MAX_EXPERT_SKILL";
    JobMax[JobMax["MAX_PRO_SKILL"] = 20] = "MAX_PRO_SKILL";
    JobMax[JobMax["MAX_TROUPE_SKILL"] = 9] = "MAX_TROUPE_SKILL";
    JobMax[JobMax["MAX_MASTER_SKILL"] = 1] = "MAX_MASTER_SKILL";
    JobMax[JobMax["MAX_HERO_SKILL"] = 1] = "MAX_HERO_SKILL";
    JobMax[JobMax["MAX_LEGEND_HERO_SKILL"] = 6] = "MAX_LEGEND_HERO_SKILL";
    JobMax[JobMax["MAX_JOB_LEVEL"] = 15] = "MAX_JOB_LEVEL";
    JobMax[JobMax["MAX_EXP_LEVEL"] = 45] = "MAX_EXP_LEVEL";
    JobMax[JobMax["MAX_PRO_LEVEL"] = 30] = "MAX_PRO_LEVEL";
    JobMax[JobMax["MAX_TROUPE_LEVEL"] = 1] = "MAX_TROUPE_LEVEL";
    JobMax[JobMax["MAX_LEGEND_LEVEL"] = 130] = "MAX_LEGEND_LEVEL";
    JobMax[JobMax["MAX_CHARACTER_LEVEL"] = 150] = "MAX_CHARACTER_LEVEL";
    JobMax[JobMax["MAX_GENERAL_LEVEL"] = 120] = "MAX_GENERAL_LEVEL";
    JobMax[JobMax["MAX_MONSTER_LEVEL"] = 160] = "MAX_MONSTER_LEVEL";
    JobMax[JobMax["MAX_LEVEL"] = 120] = "MAX_LEVEL";
    JobMax[JobMax["MAX_JOBBASE"] = 1] = "MAX_JOBBASE";
    JobMax[JobMax["MAX_EXPERT"] = 6] = "MAX_EXPERT";
    JobMax[JobMax["MAX_PROFESSIONAL"] = 16] = "MAX_PROFESSIONAL";
    JobMax[JobMax["MAX_MASTER"] = 24] = "MAX_MASTER";
    JobMax[JobMax["MAX_HERO"] = 32] = "MAX_HERO";
    JobMax[JobMax["MAX_JOB"] = 40] = "MAX_JOB";
    JobMax[JobMax["MAX_3RD_LEGEND_LEVEL"] = 150] = "MAX_3RD_LEGEND_LEVEL";
    JobMax[JobMax["MAX_SKILLS"] = 45] = "MAX_SKILLS";
})(JobMax || (exports.JobMax = JobMax = {}));
var DefineJob;
(function (DefineJob) {
    DefineJob[DefineJob["JOB_VAGRANT"] = 0] = "JOB_VAGRANT";
    // Expert
    DefineJob[DefineJob["JOB_MERCENARY"] = 1] = "JOB_MERCENARY";
    DefineJob[DefineJob["JOB_ACROBAT"] = 2] = "JOB_ACROBAT";
    DefineJob[DefineJob["JOB_ASSIST"] = 3] = "JOB_ASSIST";
    DefineJob[DefineJob["JOB_MAGICIAN"] = 4] = "JOB_MAGICIAN";
    DefineJob[DefineJob["JOB_PUPPETEER"] = 5] = "JOB_PUPPETEER";
    // Professional
    DefineJob[DefineJob["JOB_KNIGHT"] = 6] = "JOB_KNIGHT";
    DefineJob[DefineJob["JOB_BLADE"] = 7] = "JOB_BLADE";
    DefineJob[DefineJob["JOB_JESTER"] = 8] = "JOB_JESTER";
    DefineJob[DefineJob["JOB_RANGER"] = 9] = "JOB_RANGER";
    DefineJob[DefineJob["JOB_RINGMASTER"] = 10] = "JOB_RINGMASTER";
    DefineJob[DefineJob["JOB_BILLPOSTER"] = 11] = "JOB_BILLPOSTER";
    DefineJob[DefineJob["JOB_PSYCHIKEEPER"] = 12] = "JOB_PSYCHIKEEPER";
    DefineJob[DefineJob["JOB_ELEMENTOR"] = 13] = "JOB_ELEMENTOR";
    DefineJob[DefineJob["JOB_GATEKEEPER"] = 14] = "JOB_GATEKEEPER";
    DefineJob[DefineJob["JOB_DOPPLER"] = 15] = "JOB_DOPPLER";
    // Master
    DefineJob[DefineJob["JOB_KNIGHT_MASTER"] = 16] = "JOB_KNIGHT_MASTER";
    DefineJob[DefineJob["JOB_BLADE_MASTER"] = 17] = "JOB_BLADE_MASTER";
    DefineJob[DefineJob["JOB_JESTER_MASTER"] = 18] = "JOB_JESTER_MASTER";
    DefineJob[DefineJob["JOB_RANGER_MASTER"] = 19] = "JOB_RANGER_MASTER";
    DefineJob[DefineJob["JOB_RINGMASTER_MASTER"] = 20] = "JOB_RINGMASTER_MASTER";
    DefineJob[DefineJob["JOB_BILLPOSTER_MASTER"] = 21] = "JOB_BILLPOSTER_MASTER";
    DefineJob[DefineJob["JOB_PSYCHIKEEPER_MASTER"] = 22] = "JOB_PSYCHIKEEPER_MASTER";
    DefineJob[DefineJob["JOB_ELEMENTOR_MASTER"] = 23] = "JOB_ELEMENTOR_MASTER";
    // Hero
    DefineJob[DefineJob["JOB_KNIGHT_HERO"] = 24] = "JOB_KNIGHT_HERO";
    DefineJob[DefineJob["JOB_BLADE_HERO"] = 25] = "JOB_BLADE_HERO";
    DefineJob[DefineJob["JOB_JESTER_HERO"] = 26] = "JOB_JESTER_HERO";
    DefineJob[DefineJob["JOB_RANGER_HERO"] = 27] = "JOB_RANGER_HERO";
    DefineJob[DefineJob["JOB_RINGMASTER_HERO"] = 28] = "JOB_RINGMASTER_HERO";
    DefineJob[DefineJob["JOB_BILLPOSTER_HERO"] = 29] = "JOB_BILLPOSTER_HERO";
    DefineJob[DefineJob["JOB_PSYCHIKEEPER_HERO"] = 30] = "JOB_PSYCHIKEEPER_HERO";
    DefineJob[DefineJob["JOB_ELEMENTOR_HERO"] = 31] = "JOB_ELEMENTOR_HERO";
    // Lord
    DefineJob[DefineJob["JOB_LORDTEMPLER_HERO"] = 32] = "JOB_LORDTEMPLER_HERO";
    DefineJob[DefineJob["JOB_STORMBLADE_HERO"] = 33] = "JOB_STORMBLADE_HERO";
    DefineJob[DefineJob["JOB_WINDLURKER_HERO"] = 34] = "JOB_WINDLURKER_HERO";
    DefineJob[DefineJob["JOB_CRACKSHOOTER_HERO"] = 35] = "JOB_CRACKSHOOTER_HERO";
    DefineJob[DefineJob["JOB_FLORIST_HERO"] = 36] = "JOB_FLORIST_HERO";
    DefineJob[DefineJob["JOB_FORCEMASTER_HERO"] = 37] = "JOB_FORCEMASTER_HERO";
    DefineJob[DefineJob["JOB_MENTALIST_HERO"] = 38] = "JOB_MENTALIST_HERO";
    DefineJob[DefineJob["JOB_ELEMENTORLORD_HERO"] = 39] = "JOB_ELEMENTORLORD_HERO";
    DefineJob[DefineJob["JOB_ALL"] = 40] = "JOB_ALL";
})(DefineJob || (exports.DefineJob = DefineJob = {}));
var SkillGroupDisciple;
(function (SkillGroupDisciple) {
    // SkillGroup (Disciple)
    SkillGroupDisciple[SkillGroupDisciple["DIS_VAGRANT"] = 0] = "DIS_VAGRANT";
    SkillGroupDisciple[SkillGroupDisciple["DIS_SWORD"] = 1] = "DIS_SWORD";
    SkillGroupDisciple[SkillGroupDisciple["DIS_DOUBLE"] = 2] = "DIS_DOUBLE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_CASE"] = 3] = "DIS_CASE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_JUGGLING"] = 4] = "DIS_JUGGLING";
    SkillGroupDisciple[SkillGroupDisciple["DIS_YOYO"] = 5] = "DIS_YOYO";
    SkillGroupDisciple[SkillGroupDisciple["DIS_RIFLE"] = 6] = "DIS_RIFLE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_MARIONETTE"] = 7] = "DIS_MARIONETTE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_BOW"] = 32] = "DIS_BOW";
    // 방어기술군
    SkillGroupDisciple[SkillGroupDisciple["DIS_SHIELD"] = 8] = "DIS_SHIELD";
    SkillGroupDisciple[SkillGroupDisciple["DIS_DANCE"] = 9] = "DIS_DANCE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_ACROBATIC"] = 10] = "DIS_ACROBATIC";
    SkillGroupDisciple[SkillGroupDisciple["DIS_SUPPORT"] = 23] = "DIS_SUPPORT";
    // 마법연계 기술군
    SkillGroupDisciple[SkillGroupDisciple["DIS_HEAL"] = 11] = "DIS_HEAL";
    SkillGroupDisciple[SkillGroupDisciple["DIS_CHEER"] = 12] = "DIS_CHEER";
    SkillGroupDisciple[SkillGroupDisciple["DIS_ACTING"] = 13] = "DIS_ACTING";
    SkillGroupDisciple[SkillGroupDisciple["DIS_POSTER"] = 14] = "DIS_POSTER";
    SkillGroupDisciple[SkillGroupDisciple["DIS_FIRE"] = 15] = "DIS_FIRE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_WIND"] = 16] = "DIS_WIND";
    SkillGroupDisciple[SkillGroupDisciple["DIS_WATER"] = 17] = "DIS_WATER";
    SkillGroupDisciple[SkillGroupDisciple["DIS_EARTH"] = 18] = "DIS_EARTH";
    SkillGroupDisciple[SkillGroupDisciple["DIS_ELECTRICITY"] = 24] = "DIS_ELECTRICITY";
    // 특수 기술
    SkillGroupDisciple[SkillGroupDisciple["DIS_STRINGDANCE"] = 19] = "DIS_STRINGDANCE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_GIGAPUPPET"] = 20] = "DIS_GIGAPUPPET";
    SkillGroupDisciple[SkillGroupDisciple["DIS_KNUCKLE"] = 21] = "DIS_KNUCKLE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_MAGIC"] = 22] = "DIS_MAGIC";
    SkillGroupDisciple[SkillGroupDisciple["DIS_MULTY"] = 23] = "DIS_MULTY";
    SkillGroupDisciple[SkillGroupDisciple["DIS_PSYCHIC"] = 24] = "DIS_PSYCHIC";
    SkillGroupDisciple[SkillGroupDisciple["DIS_CURSE"] = 25] = "DIS_CURSE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_HOLY"] = 26] = "DIS_HOLY";
    SkillGroupDisciple[SkillGroupDisciple["DIS_TWOHANDWEAPON"] = 27] = "DIS_TWOHANDWEAPON";
    SkillGroupDisciple[SkillGroupDisciple["DIS_TWOHANDSWORD"] = 28] = "DIS_TWOHANDSWORD";
    SkillGroupDisciple[SkillGroupDisciple["DIS_TWOHANDAXE"] = 29] = "DIS_TWOHANDAXE";
    SkillGroupDisciple[SkillGroupDisciple["DIS_DOUBLESWORD"] = 30] = "DIS_DOUBLESWORD";
    SkillGroupDisciple[SkillGroupDisciple["DIS_DOUBLEAXE"] = 31] = "DIS_DOUBLEAXE";
})(SkillGroupDisciple || (exports.SkillGroupDisciple = SkillGroupDisciple = {}));
var TroupRank;
(function (TroupRank) {
    // 극단 소속
    TroupRank[TroupRank["TRO_MASTER"] = 0] = "TRO_MASTER";
    TroupRank[TroupRank["TRO_MEMBERE"] = 1] = "TRO_MEMBERE";
})(TroupRank || (exports.TroupRank = TroupRank = {}));
var GuildRank;
(function (GuildRank) {
    // 길드소속
    GuildRank[GuildRank["GUD_MASTER"] = 0] = "GUD_MASTER";
    GuildRank[GuildRank["GUD_KINGPIN"] = 1] = "GUD_KINGPIN";
    GuildRank[GuildRank["GUD_CAPTAIN"] = 2] = "GUD_CAPTAIN";
    GuildRank[GuildRank["GUD_SUPPORTER"] = 3] = "GUD_SUPPORTER";
    GuildRank[GuildRank["GUD_ROOKIE"] = 4] = "GUD_ROOKIE";
})(GuildRank || (exports.GuildRank = GuildRank = {}));
