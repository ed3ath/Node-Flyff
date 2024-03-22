QUEST_ALICE01 = {
	title = 'IDS_PROPQUEST_INC_002397',
	character = 'MaFl_Alice',
	end_character = 'MaFl_Alice',
	start_requirements = {
		min_level = 60,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_ARM_S_CLO_CLO_SCHOOL_1', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_GIANTFORCEPS', quantity = 100, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_INKSAC', quantity = 150, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_CATBELL', quantity = 200, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_MINIWHEEL', quantity = 1000, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_WHEEL', quantity = 1000, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_SCRAPTOPAZ', quantity = 20, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002398',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002399',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002400',
		},
		completed = {
			'IDS_PROPQUEST_INC_002401',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002402',
		},
	}
}
