QUEST_ALICE03 = {
	title = 'IDS_PROPQUEST_INC_002413',
	character = 'MaFl_Alice',
	end_character = 'MaFl_Alice',
	start_requirements = {
		min_level = 80,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_ALICE02',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_ARM_S_CLO_CLO_DRAGON_1', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_BROKENWINGS', quantity = 200, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_CROWN', quantity = 250, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_POLEVIKMUD', quantity = 300, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_MINIWHEEL', quantity = 2000, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_WHEEL', quantity = 2000, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_SCRAPORICHALCUM', quantity = 20, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002414',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002415',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002416',
		},
		completed = {
			'IDS_PROPQUEST_INC_002417',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002418',
		},
	}
}
