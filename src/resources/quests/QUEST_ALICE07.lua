QUEST_ALICE07 = {
	title = 'IDS_PROPQUEST_INC_002445',
	character = 'MaFl_Alice',
	end_character = 'MaFl_Alice',
	start_requirements = {
		min_level = 120,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_ALICE06',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_ARM_S_CLO_CLO_DRAGON2_1', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_DATALBALL', quantity = 400, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_YELLOWCRYSTAL', quantity = 450, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_GANESALVORY', quantity = 500, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_ASURAHEART', quantity = 550, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_MINIWHEEL', quantity = 8000, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_WHEEL', quantity = 8000, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_SCR_SCRAPDIAMOND', quantity = 15, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002446',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002447',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002448',
		},
		completed = {
			'IDS_PROPQUEST_INC_002449',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002450',
		},
	}
}
