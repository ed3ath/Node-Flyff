QUEST_ALICE05 = {
	title = 'IDS_PROPQUEST_INC_002429',
	character = 'MaFl_Alice',
	end_character = 'MaFl_Alice',
	start_requirements = {
		min_level = 100,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_ALICE04',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_ARM_S_CLO_CLO_DRAGON1_1', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_GOGGLOO', quantity = 300, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_GREENCRYSTAL', quantity = 350, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_HAGNAIL', quantity = 400, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_MINIWHEEL', quantity = 4000, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_WHEEL', quantity = 4000, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_SCRAPSAPPHIRE', quantity = 20, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002430',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002431',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002432',
		},
		completed = {
			'IDS_PROPQUEST_INC_002433',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002434',
		},
	}
}
