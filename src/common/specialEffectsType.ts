export enum SpecialEffectsType {
  XI_DEFAULT = 10,
  XI_HIT_CRITICAL01 = 11,
  XI_HIT_MISS01 = 12,
  XI_HIT_PARRY01 = 13,
  XI_HIT_RESIST01 = 14,
  XI_HIT_BLOCK01 = 15,
  XI_HIT_HITBLOCK01 = 16,
  XI_HIT_SWORD01 = 20,
  XI_HIT_SWORD02 = 21,
  XI_HIT_WAND01 = 22,
  XI_HIT_WAND02 = 23,
  XI_HIT_STICK01 = 24,
  XI_HIT_STICK02 = 25,
  XI_FIR_WAND01 = 27,
  XI_FIR_WAND02 = 28,
  XI_FIR_RANGE01 = 29,
  XI_FIR_RANGE02 = 30,
  XI_HIT_KNUCKLE01 = 31,
  XI_HIT_KNUCKLE02 = 32,
  XI_HIT_BOW01 = 33,
  XI_HIT_YOY01 = 17,
  XI_GEN_RESTORATION01 = 34,
  XI_GEN_RESTORATION02 = 35,
  XI_GEN_RESTORATION03 = 36,
  XI_GEN_RESTORATION04 = 37,
  XI_GEN_INCREASE01 = 38,
  XI_GEN_INCREASE02 = 39,
  XI_GEN_INCREASE03 = 40,
  XI_GEN_INCREASE04 = 41,
  XI_GEN_LEVEL_UP01 = 42,
  XI_GEN_LEVEL_UP02 = 43,
  XI_GEN_LEVEL_UP03 = 44,
  XI_GEN_LEVEL_UP04 = 45,
  XI_GEN_LOGIN01 = 46,
  XI_GEN_LOGIN02 = 48,
  XI_GEN_LOGIN03 = 49,
  XI_GEN_WARP01 = 51,
  XI_GEN_WARP02 = 52,
  XI_GEN_WARP03 = 53,
  XI_GEN_PC_DIE01 = 55,
  XI_GEN_PC_DIE02 = 56,
  XI_GEN_PC_DIE03 = 57,
  XI_GEN_MONSTER_SPAWN01 = 59,
  XI_GEN_MONSTER_SPAWN02 = 60,
  XI_GEN_MONSTER_SPAWN03 = 61,
  XI_GEN_CURE01 = 62,
  XI_GEN_MOVEMARK01 = 63,
  XI_GEN_ITEM_SHINE01 = 64,
  XI_GEN_REF01 = 65,
  XI_GEN_WATERCIRCLE01 = 70,
  XI_GEN_WATERCROWN01 = 71,
  XI_GEN_RAINCIRCLE01 = 72,
  XI_GEN_CO_LODELIGHT = 80,
  XI_GEN_SA_LODESTAR = 81,
  XI_GEN_FL_LODESTAR = 82,
  XI_ITEM_WAND_ATK1 = 100,
  XI_ITEM_WAND_ATK2 = 101,
  XI_ITEM_WAND_ATK3 = 102,
  XI_ITEM_WAND_ATK4 = 103,
  XI_ITEM_COLLECT = 104,
  XI_FLIGHT_PROXITOR = 105,
  XI_SYS_REMOVE01 = 106,
  XI_SYS_EXPAN01 = 107,
  XI_SYS_EXCHAN01 = 108,
  XI_SYS_RELEASE01 = 109,
  XI_CHR_REF01 = 110,
  XI_CHR_CURE01 = 111,
  XI_ITEM_RANGE_ATK1 = 112,
  XI_ITEM_RANGE_ATK2 = 113,
  XI_ITEM_RANGE_ATK3 = 114,
  XI_ITEM_RANGE_ATK4 = 115,
  XI_ITEM_YOYO_ATK1 = 116,
  XI_FLIGHT_READY = 117,
  XI_BLINKWING_READY = 118,
  XI_CHR_CURSOR1 = 119,
  XI_SKILL_VAG_ONE_CLEANHIT01 = 201,
  XI_SKILL_VAG_ONE_BRANDISH01 = 202,
  XI_SKILL_VAG_ONE_OVERCUTTER01 = 203,
  XI_SKILL_MER_ONE_SPLMASH01 = 204,
  XI_SKILL_MER_ONE_SPLMASH02 = 215,
  XI_SKILL_MER_ONE_KEENWHEEL01 = 205,
  XI_SKILL_MER_ONE_BLINDSIDE01 = 206,
  XI_SKILL_MER_ONE_MSUPPORT01 = 207,
  XI_SKILL_MER_ONE_SPECIALHIT01 = 208,
  XI_SKILL_MER_SHIELD_PROTECTION01 = 209,
  XI_SKILL_MER_SHIELD_PROTECTION02 = 216,
  XI_SKILL_MER_SHIELD_PANBARRIER01 = 210,
  XI_SKILL_MER_SHIELD_PANBARRIER02 = 211,
  XI_SKILL_MER_SHIELD_GUILOTIN01 = 212,
  XI_SKILL_MER_SHIELD_SNEAKER01 = 213,
  XI_SKILL_MER_SHIELD_REFLEXHIT01 = 214,
  XI_SKILL_MER_SUP_BLAZINGSWORD01 = 217,
  XI_SKILL_MER_SUP_BLAZINGSWORD02 = 218,
  XI_SKILL_MER_SUP_SMITEAXE01 = 219,
  XI_SKILL_MER_SUP_SMITEAXE02 = 220,
  XI_SKILL_MER_SUP_IMPOWERWEAPON01 = 223,
  XI_SKILL_MER_SUP_IMPOWERWEAPON02 = 224,
  XI_SKILL_MER_ONE_BLOODYSTRIKE01 = 225,
  XI_SKILL_MER_ONE_BLOODYSTRIKE02 = 226,
  XI_SKILL_MER_ONE_SWORDMASTERY02 = 227,
  XI_SKILL_MER_ONE_AXEMASTERY02 = 228,
  XI_SKILL_MER_ONE_SPECIALHIT02 = 229,
  XI_SKILL_MER_ONE_GUILOTIN02 = 230,
  XI_SKILL_MER_ONE_SNEAKER02 = 231,
  XI_SKILL_MER_ONE_REFLEXHIT02 = 232,
  XI_SKILL_MAG_FIRE_BOOMERANG01 = 264,
  XI_SKILL_MAG_FIRE_HOTAIR01 = 265,
  XI_SKILL_MAG_FIRE_FURNACE01 = 267,
  XI_SKILL_MAG_FIRE_BLOWUP01 = 268,
  XI_SKILL_MAG_WIND_SWORDWIND01 = 269,
  XI_SKILL_MAG_WIND_STRONGWIND01 = 270,
  XI_SKILL_MAG_WIND_AFTERSTORM01 = 271,
  XI_SKILL_MAG_WIND_MICROBURST01 = 272,
  XI_SKILL_MAG_WIND_VACUUMSTORM01 = 273,
  XI_SKILL_MAG_FIRE_CASTING01 = 274,
  XI_SKILL_MAG_WIND_CASTING01 = 275,
  XI_SKILL_MAG_WATER_CASTING01 = 276,
  XI_SKILL_MAG_ELECTRICITY_CASTING01 = 277,
  XI_SKILL_MAG_EARTH_CASTING01 = 278,
  XI_SKILL_MAG_MAG_CASTING01 = 279,
  XI_SKILL_MAG_WATER_ICEMISSILE01 = 302,
  XI_SKILL_MAG_ELECTRICITY_LIGHTINGBALL01 = 303,
  XI_SKILL_MAG_EARTH_SPIKESTONE01 = 304,
  XI_SKILL_MAG_MAG_MENTALSTRIKE01 = 305,
  XI_SKILL_MAG_FIRE_FIRESTRIKE01 = 235,
  XI_SKILL_MAG_FIRE_FIRESTRIKE02 = 236,
  XI_SKILL_MAG_WIND_WINDCUTTER01 = 237,
  XI_SKILL_MAG_WIND_WINDCUTTER02 = 238,
  XI_SKILL_MAG_WATER_WATERBALL01 = 239,
  XI_SKILL_MAG_WATER_WATERBALL02 = 240,
  XI_SKILL_MAG_WATER_SPRINGWATER01 = 241,
  XI_SKILL_MAG_ELECTRICITY_LGTPALM01 = 242,
  XI_SKILL_MAG_ELECTRICITY_LGTPALM02 = 243,
  XI_SKILL_MAG_ELECTRICITY_LGTSHOCK01 = 244,
  XI_SKILL_MAG_ELECTRICITY_LGTSHOCK02 = 245,
  XI_SKILL_MAG_EARTH_ROCKCRASH01 = 246,
  XI_SKILL_MAG_EARTH_ROCKCRASH02 = 247,
  XI_SKILL_MAG_EARTH_LOOTING01 = 248,
  XI_SKILL_ASS_CHEER_HAST01 = 233,
  XI_SKILL_ASS_CHEER_HAST02 = 234,
  XI_SKILL_ASS_HEAL_HEALING01 = 280,
  XI_SKILL_ASS_HEAL_PATIENCE01 = 281,
  XI_SKILL_ASS_HEAL_REGENERATION01 = 282,
  XI_SKILL_ASS_HEAL_RESURRECTION01 = 283,
  XI_SKILL_ASS_HEAL_PREVENTION01 = 284,
  XI_SKILL_ASS_CHEER_HEAPUP01 = 285,
  XI_SKILL_ASS_CHEER_CANNONBALL01 = 286,
  XI_SKILL_ASS_CHEER_VITALIMPACT01 = 287,
  XI_SKILL_ASS_CHEER_MENTALSIGN01 = 288,
  XI_SKILL_ASS_CHEER_BEEFUP01 = 289,
  XI_SKILL_ASS_CHEER_STONEHAND01 = 290,
  XI_SKILL_ASS_CHEER_QUICKSTEP01 = 291,
  XI_SKILL_ASS_CHEER_CATSREFLEX01 = 292,
  XI_SKILL_ASS_CHEER_ACCURACY01 = 293,
  XI_SKILL_ASS_KNU_POWERFIST01 = 294,
  XI_SKILL_ASS_HEAL_CASTING01 = 295,
  XI_SKILL_ASS_CHEER_CASTING01 = 296,
  XI_SKILL_ASS_RES_CASTING01 = 297,
  XI_SKILL_ASS_KNU_BURSTCRACK01 = 298,
  XI_SKILL_ASS_KNU_TAMPINGHOLE01 = 299,
  XI_SKILL_ASS_CHEER_HASCASTING01 = 438,
  XI_SKILL_ASS_CHEER_HASTE01 = 439,
  XI_SKILL_MAG_MAG_BLINKPOOL01 = 301,
  XI_SKILL_KNT_SUP_SUPPORT01 = 312,
  XI_SKILL_KNT_TWO_POWERSWING01 = 313,
  XI_SKILL_KNT_TWOSW_EARTHDIVIDER01 = 314,
  XI_SKILL_KNT_TWOSW_CHARGE01 = 315,
  XI_SKILL_KNT_TWOAX_PAINDEALER01 = 316,
  XI_SKILL_KNT_TWOAX_POWERSTUMP01 = 317,
  XI_SKILL_KNT_TWO_POWERSWING02 = 318,
  XI_SKILL_KNT_TWOSW_CHARGE02 = 319,
  XI_SKILL_KNT_TWOAX_PAINDEALER02 = 320,
  XI_SKILL_KNT_TWOAX_POWERSTUMP02 = 321,
  XI_SKILL_KNT_SUP_GUARD01 = 322,
  XI_SKILL_KNT_SUP_PAINREFLEXTION01 = 323,
  XI_SKILL_KNT_SUP_RAGE01 = 324,
  XI_SKILL_KNT_TWO_POWERSWING03 = 325,
  XI_SKILL_KNT_TWOSW_EARTHDIVIDER02 = 326,
  XI_SKILL_KNT_TWOSW_CHARGE03 = 327,
  XI_SKILL_KNT_TWOAX_PAINDEALER03 = 328,
  XI_SKILL_KNT_TWOAX_POWERSTUMP03 = 329,
  XI_SKILL_BLD_DOUBLE_CROSSSTRIKE01 = 330,
  XI_SKILL_BLD_DOUBLESW_SILENTSTRIKE01 = 331,
  XI_SKILL_BLD_DOUBLE_ARMORPENETRATE01 = 332,
  XI_SKILL_BLD_DOUBLEAX_SPRINGATTACK01 = 333,
  XI_SKILL_BLD_DOUBLESW_BLADEDANCE01 = 334,
  XI_SKILL_BLD_DOUBLEAX_HAWKATTACK01 = 335,
  XI_SKILL_BLD_DOUBLE_SONICBLADE01 = 336,
  XI_SKILL_BLD_SUP_SUPPORT01 = 337,
  XI_SKILL_BLD_DOUBLESW_SILENTSTRIKE02 = 338,
  XI_SKILL_BLD_DOUBLEAX_SPRINGATTACK02 = 339,
  XI_SKILL_BLD_DOUBLESW_BLADEDANCE02 = 340,
  XI_SKILL_BLD_DOUBLEAX_HAWKATTACK02 = 341,
  XI_SKILL_BLD_DOUBLE_SONICBLADE02 = 342,
  XI_SKILL_BLD_DOUBLE_CROSSSTRIKE02 = 343,
  XI_SKILL_BLD_DOUBLESW_SILENTSTRIKE03 = 344,
  XI_SKILL_BLD_DOUBLE_ARMORPENETRATE02 = 345,
  XI_SKILL_BLD_DOUBLEAX_SPRINGATTACK03 = 346,
  XI_SKILL_BLD_DOUBLESW_BLADEDANCE03 = 347,
  XI_SKILL_BLD_DOUBLEAX_HAWKATTACK03 = 348,
  XI_SKILL_BLD_DOUBLE_SONICBLADE03 = 349,
  XI_SKILL_BLD_SUP_BERSERK01 = 350,
  XI_SKILL_RIN_HEAL_CASTING01 = 351,
  XI_SKILL_RIN_SUP_CASTING01 = 352,
  XI_SKILL_RIN_PROTECT_CASTING01 = 353,
  XI_SKILL_RIN_ATTACK_CASTING01 = 354,
  XI_SKILL_RIN_WARP_CASTING01 = 355,
  XI_SKILL_RIN_HEAL_HEALRAIN01 = 356,
  XI_SKILL_RIN_SUP_HOLYCROSS01 = 357,
  XI_SKILL_RIN_SUP_PROTECT01 = 358,
  XI_SKILL_RIN_SUP_HOLYGUARD01 = 359,
  XI_SKILL_RIN_SUP_SPIRITUREFORTUNE01 = 360,
  XI_SKILL_RIN_HEAL_GVURTIALLA01 = 361,
  XI_SKILL_RIN_SQU_GEBURAHTIPHRETH01 = 362,
  XI_SKILL_RIN_SUP_MERKABAHANZELRUSHA01 = 363,
  XI_SKILL_BIL_KNU_ATTACK01 = 364,
  XI_SKILL_BIL_PST_CASTING01 = 365,
  XI_SKILL_BIL_PST_CASTING02 = 366,
  XI_SKILL_BIL_KNU_BELIALSMESHING01 = 367,
  XI_SKILL_BIL_KNU_PIERCINGSERPENT01 = 368,
  XI_SKILL_BIL_KNU_BLOODFIST01 = 369,
  XI_SKILL_BIL_KNU_SONICHAND01 = 370,
  XI_SKILL_BIL_KNU_ASMODEUS01 = 371,
  XI_SKILL_BIL_KNU_BARAQIJALESNA01 = 372,
  XI_SKILL_BIL_KNU_BGVURTIALBOLD01 = 373,
  XI_SKILL_BIL_KNU_ASALRAALAIKUM01 = 374,
  XI_SKILL_BIL_KNU_BELIALSMESHING02 = 375,
  XI_SKILL_BIL_KNU_PIERCINGSERPENT02 = 376,
  XI_SKILL_BIL_KNU_BLOODFIST02 = 377,
  XI_SKILL_BIL_KNU_SONICHAND02 = 378,
  XI_SKILL_BIL_KNU_ASMODEUS02 = 379,
  XI_SKILL_BIL_KNU_BARAQIJALESNA02 = 380,
  XI_SKILL_BIL_KNU_BGVURTIALBOLD02 = 381,
  XI_SKILL_BIL_KNU_ASALRAALAIKUM02 = 382,
  XI_SKILL_PSY_NLG_CASTING01 = 383,
  XI_SKILL_PSY_PSY_CASTING01 = 384,
  XI_SKILL_PSY_NLG_DEMONOLGY01 = 385,
  XI_SKILL_PSY_NLG_SATANOLGY01 = 386,
  XI_SKILL_PSY_PSY_PSYCHICBOMB01 = 387,
  XI_SKILL_PSY_PSY_PSYCHICWALL01 = 388,
  XI_SKILL_PSY_PSY_SPRITBOMB01 = 389,
  XI_SKILL_PSY_NLG_CRUCIOSPELL01 = 390,
  XI_SKILL_PSY_PSY_MAXIMUMCRISIS01 = 391,
  XI_SKILL_PSY_PSY_PSYCHICSQUARE01 = 392,
  XI_SKILL_PSY_NLG_DEMONOLGY02 = 393,
  XI_SKILL_PSY_NLG_SATANOLGY02 = 394,
  XI_SKILL_PSY_PSY_PSYCHICBOMB02 = 395,
  XI_SKILL_PSY_PSY_PSYCHICWALL02 = 396,
  XI_SKILL_PSY_PSY_SPRITBOMB02 = 397,
  XI_SKILL_PSY_NLG_CRUCIOSPELL02 = 398,
  XI_SKILL_PSY_PSY_MAXIMUMCRISIS02 = 399,
  XI_SKILL_PSY_PSY_PSYCHICSQUARE02 = 400,
  XI_SKILL_ELE_FIRE_CASTING01 = 401,
  XI_SKILL_ELE_ELECTRICITY_CASTING01 = 402,
  XI_SKILL_ELE_EARTH_CASTING01 = 403,
  XI_SKILL_ELE_WATER_CASTING01 = 404,
  XI_SKILL_ELE_WIND_CASTING01 = 405,
  XI_SKILL_ELE_MULTI_CASTING01 = 406,
  XI_SKILL_ELE_FIRE_FIREBIRD01 = 407,
  XI_SKILL_ELE_FIRE_BURINGFIELD01 = 408,
  XI_SKILL_ELE_ELECTRICITY_ELETRICSHOCK01 = 409,
  XI_SKILL_ELE_EARTH_STONESPEAR01 = 410,
  XI_SKILL_ELE_EARTH_EARTHQUAKE01 = 411,
  XI_SKILL_ELE_WATER_ICESHARK01 = 412,
  XI_SKILL_ELE_WATER_POISONCLOUD01 = 413,
  XI_SKILL_ELE_WIND_WINDFIELD01 = 414,
  XI_SKILL_ELE_MULTI_METEOSHOWER01 = 415,
  XI_SKILL_ELE_MULTI_LIGHTINGSTORM01 = 416,
  XI_SKILL_ELE_MULTI_SANDSTORM01 = 417,
  XI_SKILL_ELE_MULTI_AVALANCHE01 = 418,
  XI_SKILL_ELE_FIRE_FIREBIRD02 = 419,
  XI_SKILL_ELE_FIRE_FIREMASTER01 = 420,
  XI_SKILL_ELE_FIRE_BURINGFIELD02 = 421,
  XI_SKILL_ELE_ELECTRICITY_THUNDERSTRIKE01 = 422,
  XI_SKILL_ELE_ELECTRICITY_LIGHTINGMASTER01 = 423,
  XI_SKILL_ELE_ELECTRICITY_ELETRICSHOCK02 = 424,
  XI_SKILL_ELE_EARTH_STONESPEAR02 = 425,
  XI_SKILL_ELE_EARTH_EARTHMASTER01 = 426,
  XI_SKILL_ELE_EARTH_EARTHQUAKE02 = 427,
  XI_SKILL_ELE_WATER_ICESHARK02 = 428,
  XI_SKILL_ELE_WATER_WATERMASTER01 = 429,
  XI_SKILL_ELE_WATER_POISONCLOUD02 = 430,
  XI_SKILL_ELE_WIND_VOID01 = 431,
  XI_SKILL_ELE_WIND_WINDMASTER01 = 432,
  XI_SKILL_ELE_WIND_WINDFIELD02 = 433,
  XI_SKILL_ELE_MULTI_METEOSHOWER02 = 434,
  XI_SKILL_ELE_MULTI_LIGHTINGSTORM02 = 435,
  XI_SKILL_ELE_MULTI_SANDSTORM02 = 436,
  XI_SKILL_ELE_MULTI_AVALANCHE02 = 437,
  XI_SKILL_GEN_FLASH = 501,
  XI_SKILL_RIN_SUP_MERKABAHANZELRUSHA02 = 502,
  XI_SKILL_RIN_SUP_MERKABAHANZELRUSHA03 = 503,
  XI_SKILL_ACR_YOYO_SUPPORT01 = 504,
  XI_SKILL_ACR_BOW_SUPPORT01 = 505,
  XI_SKILL_ACR_YOYO_MASTER01 = 580,
  XI_SKILL_ACR_BOW_MASTER01 = 581,
  XI_SKILL_ACR_DAK_SUPPORT01 = 506,
  XI_SKILL_ACR_BOW_JUNKBOW01 = 507,
  XI_SKILL_ACR_SUP_SUPPORT01 = 508,
  XI_SKILL_ACR_BOW_AIMEDSHOT01 = 509,
  XI_SKILL_ACR_YOYO_SLOWSTEP01 = 510,
  XI_SKILL_ACR_BOW_SILENTSHOT01 = 511,
  XI_SKILL_ACR_DEF_SUPPORT01 = 512,
  XI_SKILL_ACR_BOW_ARROWRAIN01 = 513,
  XI_SKILL_ACR_YOYO_CROSSLINE01 = 514,
  XI_SKILL_ACR_BOW_AUTOSHOT01 = 515,
  XI_SKILL_ACR_YOYO_SNITCH01 = 516,
  XI_SKILL_ACR_YOYO_COUNTER01 = 517,
  XI_SKILL_ACR_YOYO_DEADLYSWING01 = 518,
  XI_SKILL_ACR_YOYO_PULLING01 = 519,
  XI_SKILL_JST_SUP_CRITICALSWING01 = 520,
  XI_SKILL_JST_SUP_POISON01 = 521,
  XI_SKILL_JST_SUP_BLEEDING01 = 522,
  XI_SKILL_JST_SUP_ABSORB01 = 523,
  XI_SKILL_JST_YOYO_BACKSTAB01 = 524,
  XI_SKILL_JST_YOYO_HITOFPENYA01 = 525,
  XI_SKILL_JST_YOYO_ESCAPE01 = 526,
  XI_SKILL_JST_YOYO_VATALSTAB01 = 527,
  XI_SKILL_RAG_SUP_FASTATTACK01 = 528,
  XI_SKILL_RAG_BOW_ICEARROW01 = 529,
  XI_SKILL_RAG_BOW_FLAMEARROW01 = 530,
  XI_SKILL_RAG_BOW_PIRCINGARROW01 = 531,
  XI_SKILL_RAG_BOW_POISONARROW01 = 532,
  XI_SKILL_RAG_BOW_SILENTARROW01 = 533,
  XI_SKILL_RAG_SUP_NATURE01 = 534,
  XI_SKILL_RAG_BOW_TRIPLESHOT01 = 535,
  XI_SKILL_ACR_BOW_JUNKBOW02 = 536,
  XI_SKILL_ACR_BOW_AIMEDSHOT02 = 537,
  XI_SKILL_ACR_BOW_SILENTSHOT02 = 538,
  XI_SKILL_ACR_BOW_ARROWRAIN02 = 539,
  XI_SKILL_ACR_BOW_AUTOSHOT02 = 540,
  XI_SKILL_ACR_YOYO_PULLING02 = 541,
  XI_SKILL_RAG_BOW_ICEARROW02 = 542,
  XI_SKILL_RAG_BOW_FLAMEARROW02 = 543,
  XI_SKILL_RAG_BOW_PIRCINGARROW02 = 544,
  XI_SKILL_RAG_BOW_POISONARROW02 = 545,
  XI_SKILL_RAG_BOW_SILENTARROW02 = 546,
  XI_SKILL_RAG_BOW_TRIPLESHOT02 = 547,
  XI_SKILL_ACR_YOYO_YOYOMASTER01 = 548,
  XI_SKILL_ACR_BOW_BOWMASTER01 = 549,
  XI_SKILL_ACR_SUP_DARKILLUSION01 = 550,
  XI_SKILL_ACR_BOW_JUNKBOW03 = 551,
  XI_SKILL_ACR_SUP_FASTWALK01 = 552,
  XI_SKILL_ACR_BOW_AIMEDSHOT03 = 553,
  XI_SKILL_ACR_YOYO_SLOWSTEP02 = 554,
  XI_SKILL_ACR_BOW_SILENTSHOT03 = 555,
  XI_SKILL_ACR_YOYO_ABSOLUTEBLOCK01 = 556,
  XI_SKILL_ACR_BOW_ARROWRAIN03 = 557,
  XI_SKILL_ACR_YOYO_CROSSLINE02 = 558,
  XI_SKILL_ACR_BOW_AUTOSHOT03 = 559,
  XI_SKILL_ACR_YOYO_SNITCH02 = 560,
  XI_SKILL_ACR_YOYO_COUNTER02 = 561,
  XI_SKILL_ACR_YOYO_DEADLYSWING02 = 562,
  XI_SKILL_ACR_YOYO_PULLING03 = 563,
  XI_SKILL_JST_SUP_CRITICALSWING02 = 564,
  XI_SKILL_JST_SUP_POISON02 = 565,
  XI_SKILL_JST_SUP_BLEEDING02 = 566,
  XI_SKILL_JST_SUP_ABSORB02 = 567,
  XI_SKILL_JST_YOYO_BACKSTAB02 = 568,
  XI_SKILL_JST_YOYO_HITOFPENYA02 = 569,
  XI_SKILL_JST_YOYO_ESCAPE02 = 570,
  XI_SKILL_JST_YOYO_VATALSTAB02 = 571,
  XI_SKILL_RAG_SUP_FASTATTACK02 = 572,
  XI_SKILL_RAG_BOW_ICEARROW03 = 573,
  XI_SKILL_RAG_BOW_FLAMEARROW03 = 574,
  XI_SKILL_RAG_BOW_PIRCINGARROW03 = 575,
  XI_SKILL_RAG_BOW_POISONARROW03 = 576,
  XI_SKILL_RAG_BOW_SILENTARROW03 = 577,
  XI_SKILL_RAG_SUP_NATURE02 = 578,
  XI_SKILL_RAG_BOW_TRIPLESHOT03 = 579,
  XI_ITEM_YOYO_ATK2 = 582,
  XI_ITEM_YOYO_ATK3 = 583,
  XI_ITEM_YOYO_ATK4 = 584,
  XI_ITEM_YOYO_ATK5 = 585,
  XI_ITEM_YOYO_ATK6 = 586,
  XI_ITEM_YOYO_ATK7 = 587,
  XI_ITEM_YOYO_ATK8 = 588,
  XI_ITEM_YOYO_ATK9 = 589,
  XI_ITEM_YOYO_ATK10 = 590,
  XI_ITEM_YOYO_ATK11 = 591,
  XI_ITEM_YOYO_ATK12 = 592,
  XI_ITEM_YOYO_ATK13 = 593,
  XI_ITEM_YOYO_ATK14 = 594,
  XI_ITEM_YOYO_ATK15 = 595,
  XI_ITEM_YOYO_ATK16 = 596,
  XI_ITEM_YOYO_ATK17 = 597,
  XI_ITEM_YOYO_ATK18 = 598,
  XI_ITEM_YOYO_ATK19 = 599,
  XI_ITEM_YOYO_ATK20 = 600,
  XI_ITEM_YOYO_ATK21 = 601,
  XI_ITEM_YOYO_ATK22 = 602,
  XI_SKILL_RAG_BOW_ARROWRAIN = 603,
  XI_SKILL_RAG_BOW_ARROWRAIN01 = 604,
  XI_EVE_EVENT_FAIL = 800,
  XI_EVE_EVENT_WIN = 801,
  XI_EVE_EVENT_NOTEBOOK = 802,
  XI_EVE_EVENT_DCAMARA = 803,
  XI_EVE_EVENT_AIRSHIP = 804,
  XI_EVE_EVENT_USBFANLIGHT = 805,
  XI_EVE_EVENT_BALLOON = 806,
  XI_EVE_EVENT_GIFTTICKET = 807,
  XI_EVE_EVENT_MOVIETICKET = 808,
  XI_EVE_EVENT_OST = 809,
  XI_EVE_EVENT_FAIRYLY = 810,
  XI_NAT_SMOKE_HOUSE = 1000,
  XI_NAT_DUST_RUN = 1005,
  XI_NAT_DUST_JUMP = 1010,
  XI_NAT_FAIRY_LIGHT = 1015,
  XI_NAT_LIGHT_HOUSE = 1020,
  XI_NAT_LIGHT01 = 1050,
  XI_NAT_LIGHT02 = 1051,
  XI_NAT_LIGHT03 = 1052,
  XI_NAT_FLY01 = 1060,
  XI_NAT_FLY02 = 1061,
  XI_NAT_FLY03 = 1062,
  XI_NAT_FLY04 = 1063,
  XI_NAT_FIRE01 = 1070,
  XI_NAT_FIRE02 = 1071,
  XI_NAT_FIRE03 = 1072,
  XI_NAT_FIRE04 = 1073,
  XI_NAT_FIRE05 = 1074,
  XI_NAT_FIRE06 = 1075,
  XI_NAT_WATER01 = 1076,
  XI_NAT_WATER02 = 1077,
  XI_NAT_WATER03 = 1078,
  XI_NAT_WATER04 = 1079,
  XI_NAT_WATER05 = 1080,
  XI_NAT_WATER06 = 1081,
  XI_NAT_WIND01 = 1083,
  XI_NAT_WIND02 = 1084,
  XI_NAT_WIND03 = 1085,
  XI_NAT_WIND04 = 1086,
  XI_NAT_WIND05 = 1087,
  XI_NAT_WIND06 = 1088,
  XI_NAT_EARTH01 = 1101,
  XI_NAT_EARTH02 = 1102,
  XI_NAT_EARTH03 = 1103,
  XI_NAT_EARTH04 = 1104,
  XI_NAT_EARTH05 = 1105,
  XI_NAT_EARTH06 = 1106,
  XI_NAT_FIRESHOWER01 = 1082,
  XI_NAT_HWFIREWORKS01 = 1107,
  XI_NAT_MAGICBOMB01 = 1090,
  XI_NAT_MAGICBOMB02 = 1091,
  XI_NAT_MAGICBOMB03 = 1092,
  XI_NAT_ROCKET01 = 1093,
  XI_NAT_HEART01 = 1094,
  XI_NAT_WINGANGEL01 = 1095,
  XI_NAT_WASTART01 = 1096,
  XI_NAT_TWISTER01 = 1097,
  XI_NAT_CUPITSTART01 = 1098,
  XI_NAT_ROCKET02 = 1099,
  XI_NAT_WATERDROP = 1100,
  XI_SKILL_TRO_CALL01 = 1500,
  XI_SKILL_TRO_CALL02 = 1501,
  XI_SKILL_TRO_BLITZ = 1502,
  XI_SKILL_TRO_RETREAT = 1503,
  XI_SKILL_TRO_SPHERECIRCLE = 1504,
  XI_SKILL_TRO_LINKATTACK = 1505,
  XI_SKILL_TRO_FORTUNECIRCLE = 1506,
  XI_SKILL_TRO_STRETCHING01 = 1507,
  XI_SKILL_TRO_STRETCHING02 = 1508,
  XI_SKILL_TRO_GIFTBOX = 1509,
  XI_NPC_RAN_SPITTL = 1600,
  XI_NPC_RAN_GAS = 1601,
  XI_NPC_RAN_MAGICBALL = 1602,
  XI_NPC_RAN_FOG = 1603,
  XI_NPC_RAN_MAGICBLUE = 1604,
  XI_NPC_RAN_CARD = 1605,
  XI_NPC_RAN_BOOM = 1606,
  XI_NPC_RAN_CANNON = 1607,
  XI_NPC_DIR_STEAM = 1608,
  XI_NPCSP1DIEDUST = 1609,
  XI_NPCSP1DIEPARTBO = 1610,
  XI_NPCSP1DIRAMP = 1611,
  XI_NPCSP1DIRBURST = 1612,
  XI_NPCSP1DIRCANNON = 1613,
  XI_NPCSP1DIRCIRCLE = 1614,
  XI_NPCSP1DIRFIRESP = 1615,
  XI_NPCSP1RANBALL = 1616,
  XI_NPCSP1RANBOOM = 1617,
  XI_NPCSP1RANSPARK = 1618,
  XI_NPCRISEMSIGN = 1619,
  XI_GEN_PVP_FLAG01 = 1700,
  XI_SYS_HEROMARK01 = 1701,
  XI_SYS_HEROMARK02 = 1702,
  XI_SYS_HEROMARK03 = 1703,
  XI_SYS_HEROMARK04 = 1704,
  XI_SYS_HEROMARK05 = 1705,
  XI_SYS_HEROMARK06 = 1706,
  XI_CTR_EGGEFFECT1 = 1707,
  XI_CTR_EGGEFFECT2 = 1708,
  XI_CTR_EGGEFFECT3 = 1709,
  XI_CTR_EGGEFFECT4 = 1710,
  XI_CTR_EGGEFFECT5 = 1711,
  XI_CTR_EGGEFFECT6 = 1712,
  XI_CTR_EGGEFFECT7 = 1713,
  XI_INT_SUCCESS = 1714,
  XI_INT_FAIL = 1715,
  XI_INT_INCHANT = 1716,
  XI_CHEERSENDEFFECT = 1717,
  XI_CHEERRECEIVEEFFECT = 1718,
  XI_GEN_ITEM_SETITEM03 = 1719,
  XI_GEN_ITEM_SETITEM04 = 1720,
  XI_GEN_ITEM_SETITEM05 = 1721,
  XI_GEN_ITEM_SETITEM06 = 1722,
  XI_GEN_ITEM_SETITEM07 = 1723,
  XI_GEN_ITEM_SETITEM08 = 1724,
  XI_GEN_ITEM_SETITEM09 = 1725,
  XI_GEN_ITEM_SETITEM10 = 1726,
  XI_KILL_RECOVERY = 1727,
  XI_SKILL_MER_ONE_SUPPORT01 = 1728,
  XI_SKILL_MER_ONE_SUPPORT02 = 1729,
  XI_SKILL_MER_ONE_SUPPORT03 = 1730,
  XI_SKILL_MER_ONE_SUPPORT04 = 1731,
  XI_SKILL_ASS_KNU_SUPPORT01 = 1732,
  XI_SKILL_ASS_KNU_SUPPORT02 = 1733,
  XI_SKILL_ASS_KNU_SUPPORT03 = 1734,
  XI_SETIEM_EFFECTHAND = 1735,
  XI_SKILL_MAG_WIND_STRONGWIND01_01 = 1736,
  XI_SKILL_MAG_WIND_SWORDWIND01_01 = 1737,
  XI_SKILL_MAG_FIRE_BOOMERANG01_01 = 1738,
  XI_SKILL_MAG_FIRE_HOTAIR01_01 = 1739,
  XI_SKILL_MAG_WATER_ICEMISSILE01_01 = 1740,
  XI_SKILL_MAG_ELECTRICITY_LIGHTINGBALL01_01 = 1741,
  XI_SKILL_MAG_EARTH_SPIKESTONE01_01 = 1742,
  XI_SKILL_CIRCLE_DUST = 1743,
  XI_SKILL_DROP_DUST = 1744,
  XI_SKILL_DROP_DUST_RAIN = 1745,
  XI_SKILL_MUSHMOOT_02 = 1746,
  XI_SKILL_MUSHMOOT_CHARGE = 1747,
  XI_GEN_WEARF = 1748,
  XI_GEN_BLEEDING = 1749,
  XI_GEN_RATE = 1750,
  XI_GEN_STUN = 1751,
  XI_GEN_POSION = 1752,
  XI_NAT_FIRE01_ADV = 1753,
  XI_NAT_FIRE02_ADV = 1754,
  XI_NAT_FIRE03_ADV = 1755,
  XI_NAT_FIRE04_ADV = 1756,
  XI_NAT_FIRE05_ADV = 1757,
  XI_NAT_FIRE06_ADV = 1758,
  XI_NAT_FIRE07_ADV = 1759,
  XI_NAT_FIRE08_ADV = 1760,
  XI_NAT_FIRE09_ADV = 1761,
  XI_NAT_FIRE010_ADV = 1762,
  XI_NAT_WATER01_ADV = 1763,
  XI_NAT_WATER02_ADV = 1764,
  XI_NAT_WATER03_ADV = 1765,
  XI_NAT_WATER04_ADV = 1766,
  XI_NAT_WATER05_ADV = 1767,
  XI_NAT_WATER06_ADV = 1768,
  XI_NAT_WATER07_ADV = 1769,
  XI_NAT_WATER08_ADV = 1770,
  XI_NAT_WATER09_ADV = 1771,
  XI_NAT_WATER010_ADV = 1772,
  XI_NAT_WIND01_ADV = 1773,
  XI_NAT_WIND02_ADV = 1774,
  XI_NAT_WIND03_ADV = 1775,
  XI_NAT_WIND04_ADV = 1776,
  XI_NAT_WIND05_ADV = 1777,
  XI_NAT_WIND06_ADV = 1778,
  XI_NAT_WIND07_ADV = 1779,
  XI_NAT_WIND08_ADV = 1780,
  XI_NAT_WIND09_ADV = 1781,
  XI_NAT_WIND010_ADV = 1782,
  XI_NAT_EARTH01_ADV = 1783,
  XI_NAT_EARTH02_ADV = 1784,
  XI_NAT_EARTH03_ADV = 1785,
  XI_NAT_EARTH04_ADV = 1786,
  XI_NAT_EARTH05_ADV = 1787,
  XI_NAT_EARTH06_ADV = 1788,
  XI_NAT_EARTH07_ADV = 1789,
  XI_NAT_EARTH08_ADV = 1790,
  XI_NAT_EARTH09_ADV = 1791,
  XI_NAT_EARTH010_ADV = 1792,
  XI_NAT_ELEC01_ADV = 1793,
  XI_NAT_ELEC02_ADV = 1794,
  XI_NAT_ELEC03_ADV = 1795,
  XI_NAT_ELEC04_ADV = 1796,
  XI_NAT_ELEC05_ADV = 1797,
  XI_NAT_ELEC06_ADV = 1798,
  XI_NAT_ELEC07_ADV = 1799,
  XI_NAT_ELEC08_ADV = 1800,
  XI_NAT_ELEC09_ADV = 1801,
  XI_NAT_ELEC010_ADV = 1802,
  XI_NAT_FIRE01_ADV_AL = 1803,
  XI_NAT_FIRE02_ADV_AL = 1804,
  XI_NAT_FIRE03_ADV_AL = 1805,
  XI_NAT_FIRE04_ADV_AL = 1806,
  XI_NAT_FIRE05_ADV_AL = 1807,
  XI_NAT_FIRE06_ADV_AL = 1808,
  XI_NAT_FIRE07_ADV_AL = 1809,
  XI_NAT_FIRE08_ADV_AL = 1810,
  XI_NAT_FIRE09_ADV_AL = 1811,
  XI_NAT_FIRE010_ADV_AL = 1812,
  XI_NAT_WATER01_ADV_AL = 1813,
  XI_NAT_WATER02_ADV_AL = 1814,
  XI_NAT_WATER03_ADV_AL = 1815,
  XI_NAT_WATER04_ADV_AL = 1816,
  XI_NAT_WATER05_ADV_AL = 1817,
  XI_NAT_WATER06_ADV_AL = 1818,
  XI_NAT_WATER07_ADV_AL = 1819,
  XI_NAT_WATER08_ADV_AL = 1820,
  XI_NAT_WATER09_ADV_AL = 1821,
  XI_NAT_WATER010_ADV_AL = 1822,
  XI_NAT_WIND01_ADV_AL = 1823,
  XI_NAT_WIND02_ADV_AL = 1824,
  XI_NAT_WIND03_ADV_AL = 1825,
  XI_NAT_WIND04_ADV_AL = 1826,
  XI_NAT_WIND05_ADV_AL = 1827,
  XI_NAT_WIND06_ADV_AL = 1828,
  XI_NAT_WIND07_ADV_AL = 1829,
  XI_NAT_WIND08_ADV_AL = 1830,
  XI_NAT_WIND09_ADV_AL = 1831,
  XI_NAT_WIND010_ADV_AL = 1832,
  XI_NAT_EARTH01_ADV_AL = 1833,
  XI_NAT_EARTH02_ADV_AL = 1834,
  XI_NAT_EARTH03_ADV_AL = 1835,
  XI_NAT_EARTH04_ADV_AL = 1836,
  XI_NAT_EARTH05_ADV_AL = 1837,
  XI_NAT_EARTH06_ADV_AL = 1838,
  XI_NAT_EARTH07_ADV_AL = 1839,
  XI_NAT_EARTH08_ADV_AL = 1840,
  XI_NAT_EARTH09_ADV_AL = 1841,
  XI_NAT_EARTH010_ADV_AL = 1842,
  XI_NAT_ELEC01_ADV_AL = 1843,
  XI_NAT_ELEC02_ADV_AL = 1844,
  XI_NAT_ELEC03_ADV_AL = 1845,
  XI_NAT_ELEC04_ADV_AL = 1846,
  XI_NAT_ELEC05_ADV_AL = 1847,
  XI_NAT_ELEC06_ADV_AL = 1848,
  XI_NAT_ELEC07_ADV_AL = 1849,
  XI_NAT_ELEC08_ADV_AL = 1850,
  XI_NAT_ELEC09_ADV_AL = 1851,
  XI_NAT_ELEC010_ADV_AL = 1852,
  XI_NAT_NONE01_ADV = 1853,
  XI_NAT_NONE02_ADV = 1854,
  XI_NAT_NONE03_ADV = 1855,
  XI_NAT_NONE04_ADV = 1856,
  XI_NAT_NONE05_ADV = 1857,
  XI_NAT_NONE06_ADV = 1858,
  XI_NAT_NONE07_ADV = 1859,
  XI_NAT_NONE08_ADV = 1860,
  XI_NAT_NONE09_ADV = 1861,
  XI_NAT_NONE010_ADV = 1862,
  XI_NPCMETEONYKER = 1863,
  XI_SKILL_BLD_MASTER_ONEHANDMASTER01 = 1864,
  XI_SKILL_BLD_MASTER_ONEHANDMASTER02 = 1865,
  XI_SKILL_KNT_MASTER_TWOHANDMASTER01 = 1866,
  XI_SKILL_KNT_MASTER_TWOHANDMASTER02 = 1867,
  XI_SKILL_JST_MASTER_YOYOMASTER01 = 1868,
  XI_SKILL_JST_MASTER_YOYOMASTER02 = 1869,
  XI_SKILL_RAG_MASTER_BOWMASTER01 = 1870,
  XI_SKILL_RAG_MASTER_BOWMASTER02 = 1871,
  XI_SKILL_ELE_MASTER_INTMASTER01 = 1872,
  XI_SKILL_ELE_MASTER_INTMASTER02 = 1873,
  XI_SKILL_PSY_MASTER_INTMASTER01 = 1874,
  XI_SKILL_PSY_MASTER_INTMASTER02 = 1875,
  XI_SKILL_BIL_MASTER_KNUCKLEMASTER01 = 1876,
  XI_SKILL_BIL_MASTER_KNUCKLEMASTER02 = 1877,
  XI_SKILL_RIG_MASTER_BLESSING01 = 1878,
  XI_SKILL_RIG_MASTER_BLESSING02 = 1879,
  XI_SKILL_BLD_HERO_DEFENCE01 = 1880,
  XI_SKILL_BLD_HERO_DEFENCE02 = 1881,
  XI_SKILL_KNT_HERO_DRAWING01 = 1882,
  XI_SKILL_KNT_HERO_DRAWING02 = 1883,
  XI_SKILL_JST_HERO_SILENCE01 = 1884,
  XI_SKILL_JST_HERO_SILENCE02 = 1885,
  XI_SKILL_RAG_HERO_HAWKEYE01 = 1886,
  XI_SKILL_RAG_HERO_HAWKEYE02 = 1887,
  XI_SKILL_ELE_HERO_CURSEMIND01 = 1888,
  XI_SKILL_ELE_HERO_CURSEMIND02 = 1889,
  XI_SKILL_PSY_HERO_STONE01 = 1890,
  XI_SKILL_PSY_HERO_STONE02 = 1891,
  XI_SKILL_BIL_HERO_DISENCHANT01 = 1892,
  XI_SKILL_BIL_HERO_DISENCHANT02 = 1893,
  XI_SKILL_RIG_HERO_RETURN01 = 1894,
  XI_GEN_GUILDCOMBATGROUND = 1895,
  XI_GEN_HEAVENFIRE01 = 1896,
  XI_GEN_HEAVENLIGHT01 = 1897,
  XI_SKILL_LORD1A = 1898,
  XI_SKILL_LORD1B = 1899,
  XI_SKILL_LORD2A = 1900,
  XI_SKILL_LORD2B = 1901,
  XI_SKILL_LORD3A = 1902,
  XI_SKILL_LORD3B = 1903,
  XI_SKILL_LORD4A = 1904,
  XI_SKILL_LORD4B = 1905,
  XI_SKILL_LORD5A = 1906,
  XI_SKILL_LORD6A = 1907,
  XI_SKILL_LORD6B = 1908,
  XI_LIGHT01 = 1909,
  XI_LIGHT02 = 1910,
  XI_GATE01 = 1911,
  XI_GATE02 = 1912,
  XI_EXIT01 = 1913,
  XI_BUFFPET_GRADE1 = 1914,
  XI_BUFFPET_GRADE2 = 1915,
  XI_BUFFPET_GRADE3 = 1916,
  XI_QUIZCORRECTANSWER = 1917,
  XI_NAT_HEART02 = 1918,
  XI_NAT_HEART03 = 1919,
  XI_MON_GENERAL_ATK1 = 1920,
  XI_MON_GENERAL_ATK2 = 1921,
  XI_MON_GENERAL_ATK3 = 1922,
  XI_MON_DEVIL_ATK1 = 1923,
  XI_MON_DEVIL_ATK2 = 1924,
  XI_MON_DEVIL_ATK3 = 1925,
  XI_GATE03 = 1926,
  XI_EFFECT01 = 1927,
  XI_GEN_RUSTIAGATE01 = 1928,
  XI_RARFLOWER01 = 1929,
  XI_RARGROUND01 = 1930,
  XI_RARTREE01 = 1931,
  XI_RARTREE02 = 1932,
}
