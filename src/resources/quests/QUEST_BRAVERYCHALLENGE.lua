QUEST_BRAVERYCHALLENGE = {
	title = 'IDS_PROPQUEST_INC_002523',
	character = 'MaFl_Heroevent01',
	end_character = '',
	start_requirements = {
		min_level = 121,
		max_level = 129,
		job = { 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_ARM_S_CLO_CLO_HERO02', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_MAT_DIAMOND', quantity = 50, sex = 'Any', remove = true },
			{ id = 'II_GEN_GEM_GEM_DRAGONCANINE', quantity = 2000, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_DU_METEONYKER', quantity = 5000 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002524',
			'IDS_PROPQUEST_INC_002525',
			'IDS_PROPQUEST_INC_002526',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002527',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002528',
		},
		completed = {
			'IDS_PROPQUEST_INC_002529',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002530',
		},
	}
}
